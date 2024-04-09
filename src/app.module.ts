import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { AnonymousService } from './anonymous/anonymous.service.js';
import { ArticleStore } from './store/article.store/article.store.js';
import { ParserArticlesResolver } from './parser-articles/parser-articles.resolver.js';
import { AppController } from './app.controller.js';
import { AppResolver } from './app.resolver.js';
import { ClickhouseService } from './clickhouse/clickhouse.service.js';
import { ArticleIoffeService } from './parser-articles/article-ioffe.service.js';
import { ArticleRajpubService } from './parser-articles/article-rajpub.service.js';
import { ParserGooglePatentsResolver } from './parser-google-patents/parser-google-patents.resolver.js';
import { ParserGooglePatentsService } from './parser-google-patents/parser-google-patents.service.js';
import { ParserYandexPatentsResolver } from './parser-yandex-patents/parser-yandex-patents.resolver.js';
import { ParserYandexPatentsService } from './parser-yandex-patents/parser-yandex-patents.service.js';
import { PrismaService } from './prisma/prisma.service.js';
import { QueueHandlerService } from './queue-handler/queue-handler.service.js';
import { PatentStore } from './store/patent-store/patent.store.js';
import { QueueStore } from './store/queue-store/queue.store.js';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
      subscriptions: { 'graphql-ws': true },
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AnonymousService,
    PatentStore, QueueStore,
    PrismaService, ClickhouseService,
    QueueHandlerService,
    ParserGooglePatentsService,
    AppResolver,
    ArticleRajpubService,
    ArticleIoffeService,
    ArticleStore,
    ParserArticlesResolver,
    ParserYandexPatentsResolver,
    ParserYandexPatentsService,
    ParserGooglePatentsResolver,
  ],
})
export class AppModule {}
