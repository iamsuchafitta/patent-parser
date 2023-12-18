import { EventEmitter } from 'events';
import { WsEvents } from './pub-sub.constants';
import { MonitorLogTypeEnum } from '@prisma/client';

class AppEventEmitterClass {
  private readonly emitter = new EventEmitter();

  private listenerMonitorLogCreated: (type: MonitorLogTypeEnum, message: string) => void;

  public onMonitorLogCreated(listener: (type: MonitorLogTypeEnum, message: string) => void) {
    if (this.listenerMonitorLogCreated) {
      this.emitter.removeListener(WsEvents.MonitorLogCreated, this.listenerMonitorLogCreated);
    }
    this.listenerMonitorLogCreated = listener;
    this.emitter.on(WsEvents.MonitorLogCreated, listener);
  }

  public MonitorLogCreated(type: MonitorLogTypeEnum, message: string) {
    this.emitter.emit(WsEvents.MonitorLogCreated, type, message);
  }

  private listenerMonitorStatCreate: () => void;

  public onMonitorStatCreate(listener: () => void) {
    if (this.listenerMonitorStatCreate) {
      this.emitter.removeListener(WsEvents.MonitorStatCreated, this.listenerMonitorStatCreate);
    }
    this.listenerMonitorStatCreate = listener;
    this.emitter.on(WsEvents.MonitorStatCreated, listener);
  }

  public MonitorStatCreate() {
    this.emitter.emit(WsEvents.MonitorStatCreated);
  }
}

export const AppEventEmitter = new AppEventEmitterClass();
