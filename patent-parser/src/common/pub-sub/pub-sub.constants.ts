export enum PgNotifications {
  PatentsCountChanged = 'patents_count_changed',
  MonitorLogInserted = 'monitor_log_inserted',
  MonitorStatInserted = 'monitor_stat_inserted',
  QueueLengthChanged = 'queue_length_changed',
}

export enum WsEvents {
  MonitorStatCreated = 'monitorStatCreated',
  MonitorLogCreated = 'monitorLogCreated',
  PatentsCountChanged = 'patentsCountChanged',
  QueueLengthChanged = 'queueChanged',
}
