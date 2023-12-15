/* eslint-disable no-nested-ternary */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { GraphQLResolveInfo } from 'graphql/type';

/**
 * Decorator for prisma select object by GraphQLResolveInfo
 */
export const PrismaSelector = createParamDecorator(
  <T>(
    key: undefined | keyof T | '!instance',
    context: ExecutionContext,
  ) => {
    const info: GraphQLResolveInfo = GqlExecutionContext.create(context).getInfo();
    const prismaSelect: PrismaSelect = new PrismaSelect(info);
    if (key === '!instance') {
      return prismaSelect;
    }
    if (typeof key === 'string') {
      return prismaSelect.valueOf(key).select;
    }
    return prismaSelect.value.select;
    // return key === 'prismaSelect'
    //   ? prismaSelect.value[key]
    //   : key
    //     ? prismaSelect[key]
    //     : prismaSelect;
  },
);
