import { Module } from '@nestjs/common';
import { AppResolver } from './app.resolver';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PatentStore } from './store/patent-store/patent.store';
import { QueueStore } from './store/queue-store/queue.store';
import { QueueHandlerService } from './queue-handler/queue-handler.service';
import { PatentResolver } from './patent/patent.resolver';
import { PatentController } from './patent/patent.controller';
import { AnonymousService } from './anonymous/anonymous.service';
import { PrismaService } from './prisma/prisma.service';
import { ClickhouseService } from './clickhouse/clickhouse.service';
import { ParserGooglePatentsService } from './parser-google-patents/parser-google-patents.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      subscriptions: { 'graphql-ws': true },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [PatentController],
  providers: [
    AnonymousService,
    PatentStore, QueueStore,
    PrismaService, ClickhouseService,
    QueueHandlerService,
    ParserGooglePatentsService,
    PatentResolver,
    AppResolver,
  ],
})
export class AppModule {}
