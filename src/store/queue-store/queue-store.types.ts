import type { Nillable } from '../../types';
import { registerEnumType } from '@nestjs/graphql';
import type { SetOptional } from 'type-fest';
import { QueueElementTypeEnum } from '@prisma/client';

export type QueueElementCreateInput = SetOptional<QueueElement, 'tries' | 'createdAt' | 'updatedAt'>

export type QueueElement = {
  url: string
  type: QueueElementTypeEnum
  startedAt?: Nillable<Date>
  tries: number // Int
  createdAt: Date
  updatedAt: Date
}

export enum QueueElementTypeEnum1 {
  GooglePatent = 'GooglePatent',
}

registerEnumType(QueueElementTypeEnum1, {
  name: 'QueueElementTypeEnum',
  description: 'Type of parsing task',
});
