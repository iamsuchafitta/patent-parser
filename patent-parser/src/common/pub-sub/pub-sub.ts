import { PubSub } from 'graphql-subscriptions';
import { MonitorLog, MonitorStat } from '@prisma/client';
import { WsEvents } from './pub-sub.constants';

class AppPubSubClass extends PubSub {
  public async MonitorStatsCreated(monitorStats: MonitorStat) {
    await this.publish(WsEvents.MonitorStatCreated, { [WsEvents.MonitorStatCreated]: monitorStats });
  }

  public async MonitorLogCreated(monitorLog: MonitorLog) {
    await this.publish(WsEvents.MonitorLogCreated, { [WsEvents.MonitorLogCreated]: monitorLog });
  }

  public async PatentsCountChanged(count: number) {
    await this.publish(WsEvents.PatentsCountChanged, { [WsEvents.PatentsCountChanged]: count });
  }

  public async QueueLengthChanged() {
    await this.publish(WsEvents.QueueLengthChanged, {});
  }
}

export const AppPubSub = new AppPubSubClass();
