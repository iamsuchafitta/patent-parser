import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import ms from 'ms';
import { PrismaService } from '../../prisma/prisma.service';
import { appMonitor } from '../../parser/other/app-monitor';
import { AppConfig } from '../../common/app-config';
import { ParserService } from '../../parser/parser.service';
import { AnonymousService } from '../../anonymous/anonymous.service';
import { MonitorLogTypeEnum } from '@prisma/client';
import { PgNotifications } from '../../common/pub-sub/pub-sub.constants';
import { AppPubSub } from '../../common/pub-sub/pub-sub';
import { values } from 'lodash';
import { AppEventEmitter } from '../../common/pub-sub/app-event-emitter';

@Injectable()
export class MonitorService implements OnModuleInit {
  private readonly logger = new Logger(MonitorService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly parserService: ParserService,
    private readonly anonymousService: AnonymousService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async onModuleInit() {
    this.schedulerRegistry.addTimeout('writeStat', setTimeout(this.writeStats.bind(this), ms('1m')));
    AppEventEmitter.onMonitorLogCreated(this.handleMessage.bind(this));
    AppEventEmitter.onMonitorStatCreate(this.writeStats.bind(this));

    this.prisma.pg.query(values(PgNotifications).map((channel) => `LISTEN ${channel};`).join('')).then();
    this.prisma.pg.on('notification', async message => {
      if (message.channel === PgNotifications.QueueLengthChanged) {
        await AppPubSub.QueueLengthChanged();
      }
      if (message.channel === PgNotifications.PatentsCountChanged) {
        await AppPubSub.PatentsCountChanged(parseInt(message.payload || '0'));
      }
      if (message.channel === PgNotifications.MonitorLogInserted) {
        await AppPubSub.MonitorLogCreated(await this.prisma.monitorLog.findUniqueOrThrow({ where: { id: message.payload! } }));
      }
      if (message.channel === PgNotifications.MonitorStatInserted) {
        await AppPubSub.MonitorStatsCreated(await this.prisma.monitorStat.findUniqueOrThrow({ where: { id: message.payload! } }));
      }
    });
  }

  async writeStats() {
    clearTimeout(this.schedulerRegistry.getTimeout('writeStat'));
    this.schedulerRegistry.deleteTimeout('writeStat');
    this.schedulerRegistry.addTimeout('writeStat', setTimeout(this.writeStats.bind(this), ms('1m')));
    const latestStat = await this.prisma.monitorStat.findFirst({
      where: { parserId: AppConfig.parserId },
      orderBy: { createdAt: 'desc' },
    });
    if (latestStat && latestStat.createdAt > new Date(Date.now() - ms('10s'))) {
      return;
    }
    const data = await appMonitor();
    await this.prisma.monitorStat.create({
      data: {
        parserId: AppConfig.parserId,
        currentProcessing: this.parserService.currentProcessing,
        errors: this.anonymousService.errorsCount,
        errorsMax: this.anonymousService.ERRORS_TO_PROXY_RESET,
        rssMb: data.rssMb,
        heapMb: data.heapUsedMb,
        heapMaxMb: data.heapTotalMb,
        externalMb: data.externalMb,
        sighup: data.SIGHUPs,
        sigint: data.SIGINTs,
        sigterm: data.SIGTERMs,
      },
    });
  }

  async handleMessage(type: MonitorLogTypeEnum, message: string) {
    const logType = ({
      [MonitorLogTypeEnum.Info]: 'log',
      [MonitorLogTypeEnum.Warning]: 'warn',
      [MonitorLogTypeEnum.Error]: 'error',
    } as const)[type] || 'log';
    this.logger[logType](message);
    await this.prisma.monitorLog.create({
      data: {
        parserId: AppConfig.parserId,
        message,
        type,
      },
    });
  }
}
