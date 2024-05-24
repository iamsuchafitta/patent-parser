# Парсер патентов и журнальных статей

## Описание

Приложение для сбора в ClickHouse информации о патентах и публикациях с ресурсов:

- [Google Patents](https://patents.google.com/) - Патенты со всего мира.
- [Yandex Patents](https://yandex.ru/patents) - Патенты РФ И СССР.
- [Журнальный портал ФТИ им. А.Ф. Иоффе](https://journals.ioffe.ru) - Русскоязычные статьи.
- [JOURNAL OF ADVANCES IN PHYSICS](https://rajpub.com/index.php/jap/index) - Англоязычные статьи.

## Эффективность и отказоустойчивость

Приложение:

* Использует очередь задач через БД и pessimistic locking с пропуском уже заблокированных записей<span style="color:gray">, что позволяет распараллеливать парсинг вертикально и горизонтально</span>.

* Масштабируется горизонтально: Может быть запущено во множестве реплик<span style="color:gray">, например, в кластере [Kubernetes](https://kubernetes.io) или [Docker Swarm](https://docs.docker.com/engine/swarm)</span>.

* Масштабируется вертикально: Параллельная обработка нескольких задач в каждой из реплик.

* Продолжает работу при ошибке соединения/парсинге патента<span style="color:gray">, а патент с ошибкой будет повторно обработан через определенный промежуток времени</span>.

* Использует пул SOCKS5 Tor Proxy для избежания блокировок IP адреса<span style="color:gray">, а так же автоматически запрашивает новые proxy через определенный промежуток времени и при достижении лимита отказов</span>.

## Стек технологий

- Основное
  * [NodeJS](https://nodejs.org) - кроссплатформенная среда выполнения JavaScript с открытым исходным кодом.
  * [Docker](https://www.docker.com) - Контейнеризация приложения.
  * [PostgreSQL](https://www.postgresql.org) - Свободная объектно-реляционная СУБД. Используется для управления очередью парсинга.
  * [ClickHouse](https://clickhouse.com) - Колоночная СУБД для аналитических данных. Используется для хранения данных о патентах и статьях.
  * [tor-privoxy](https://github.com/dockage/tor-privoxy) - Docker Образ с Tor proxy.
- Дополнительно
  * [TypeScript](https://www.typescriptlang.org) - Расширение JavaScript, добавляющее типизацию в язык.
  * [NestJS](https://nestjs.com) - Фреймворк для создания эффективных, надежных и масштабируемых серверных приложений на JS/TS.
  * [GraphQL](https://graphql.org) - язык и описание API.
  * [Prisma](https://www.prisma.io) - ORM для NodeJS.
  * [@clickhouse/client](https://clickhouse.com/docs/en/integrations/language-clients/javascript) - ClickHouse клиент.
  * [Puppeteer](https://pptr.dev) - автоматизации Chrome/Chromium для взаимодействия с веб-сайтами.
  * [Axios](https://www.npmjs.com/package/axios) - HTTP-клиент.

## Разработка

Требования: NodeJS LTS, Docker

```bash
# Установка зависимостей
npm install
npx puppeteer browsers install chrome
# Запуск БД и необходимых сервисов
npm run svc:dev:up
# Создание схем БД: PostgreSQL & ClickHouse
npx prisma db push
npm run clickhouse:migrate
# Запуск приложения в режиме разработки
npm run start:dev
```
