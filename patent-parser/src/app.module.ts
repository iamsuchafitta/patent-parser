import { Module } from '@nestjs/common';
import { ParserModule } from './parser/parser.module';
import { AppResolver } from './app.resolver';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AnonymousModule } from './anonymous/anonymous.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    ScheduleModule.forRoot(),
    ParserModule,
    PrismaModule,
    AnonymousModule,
    ApiModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
