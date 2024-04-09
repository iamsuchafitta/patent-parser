import { registerEnumType } from '@nestjs/graphql';
import Prisma from '@prisma/client';
import type { SetOptional } from 'type-fest';
import type { Nillable } from '../../types/types.js';

export const QueueElementTypeEnum = Prisma.QueueElementTypeEnum;
export type QueueElementTypeEnum = (typeof QueueElementTypeEnum)[keyof typeof QueueElementTypeEnum];

export type QueueElementCreateInput = SetOptional<QueueElement, 'tries' | 'createdAt' | 'updatedAt' | 'priority'>

export type QueueElement = {
  url: string
  type: QueueElementTypeEnum
  startedAt?: Nillable<Date>
  tries: number // Int
  priority: number // Int
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
