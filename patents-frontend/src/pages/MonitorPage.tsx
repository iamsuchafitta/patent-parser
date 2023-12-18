import { FC, useMemo } from 'react';
import { AreaChart, Card } from '@tremor/react';
import { useMonitorStatCreatedSubscription, useMonitorStatsQuery } from '../api/generated.ts';
import { toast } from 'sonner';
import * as dayjs from 'dayjs';
import { apolloClient } from '../api/apollo-client/apollo-client.ts';
import * as _ from 'lodash';

export const MonitorPage: FC = () => {
  const { data: { monitorStats: stats = [] } = {} } = useMonitorStatsQuery({
    onError: error => toast.error(`Ошибка загрузки статистики: ${error.message}`),
    variables: {
      pagination: {
        // skip: 300,
        take: 50,
      },
    },
  });
  useMonitorStatCreatedSubscription({
    onError: error => toast.error(`Ошибка подписки на статистику: ${error.message}`),
    onData: ({ data: { data: { monitorStatCreated: stat } = {} } }) => apolloClient.cache.modify({
      fields: {
        monitorStats: (existing = []) => [stat, ...existing],
      },
    }),
  });

  const { parserIds, rss, processing } = useMemo(() => {
    const parserIds = Array.from(stats.reduce((acc, stat) => acc.add(stat.parserId), new Set<string>())).sort();
    const rssLast = new Map<string, number>();
    const rssPrepared = _.clone(stats).reverse().map(stat => {
      const rezult = ({
        date: dayjs(stat.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        ...(parserIds.reduce((acc, parserId) => ({ ...acc, [parserId]: rssLast.get(parserId) }), {})),
        [stat.parserId]: stat.rssMb,
      });
      rssLast.set(stat.parserId, stat.rssMb!);
      return rezult;
    });
    const processingLast = new Map<string, number>();
    const processingPrepared = _.clone(stats).reverse().map(stat => {
      const rezult = ({
        date: dayjs(stat.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        ...(parserIds.reduce((acc, parserId) => ({ ...acc, [parserId]: processingLast.get(parserId) }), {})),
        [stat.parserId]: stat.currentProcessing,
      });
      processingLast.set(stat.parserId, stat.currentProcessing!);
      return rezult;
    });
    return { parserIds, rss: rssPrepared, processing: processingPrepared };
  }, [stats]);

  return (
    <div className="m-10">
      <Card>
        <h1>RAM (Resident Set Size)</h1>
        <AreaChart
          className="h-72"
          data={rss}
          index="date"
          categories={parserIds}
          connectNulls
          colors={['red', 'green', 'blue', 'pink']}
          valueFormatter={value => `${value} MB`}
        />
      </Card>
      <Card className="mt-3">
        <h1>Current Processing</h1>
        <AreaChart
          className="h-72"
          data={processing}
          index="date"
          categories={parserIds}
          connectNulls
          colors={['red', 'green', 'blue', 'pink']}
        />
      </Card>
    </div>
  );
};
