import { FC, useEffect, useRef, useState } from 'react';
import { GMonitorLog, GMonitorLogTypeEnum, useMonitorLogCreatedSubscription, useMonitorLogsQuery } from '../api/generated.ts';
import { toast } from 'sonner';
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import clsx from 'clsx';
import { apolloClient } from '../api/apollo-client/apollo-client.ts';
import { sortBy, sortedUniqBy } from 'lodash';
import * as dayjs from 'dayjs';

export const LogsPage: FC = () => {
  const [loadedCount, setLoadedCount] = useState(0);

  const mergeLogs = (logsLoaded: GMonitorLog[], logsExist: GMonitorLog[] = []) => {
    const logs = sortedUniqBy(sortBy([...logsLoaded, ...logsExist].filter(log => !!log.id), log => log.createdAt), log => log.id).reverse();
    setLoadedCount(logs.length);
    toast.success(`Всего загружено ${logs.length} логов`);
    return logs;
  };

  const { data: { monitorLogs: logs = [] } = {}, loading: isLoadingLogs, fetchMore, refetch } = useMonitorLogsQuery({
    onError: error => toast.error(`Ошибка загрузки логов: ${error.message}`),
    onCompleted: ({ monitorLogs }) => apolloClient.cache.modify({
      fields: { monitorLogs: (existingLogs) => mergeLogs(monitorLogs, existingLogs) },
    }),
  });

  useMonitorLogCreatedSubscription({
    onError: error => toast.error(`Ошибка подписки на логи: ${error.message}`),
    onData: ({ data: { data: { monitorLogCreated } = {} } }) => monitorLogCreated && apolloClient.cache.modify({
      fields: { monitorLogs: (existingLogs) => mergeLogs([monitorLogCreated], existingLogs) },
    }),
  });

  const tableRef = useRef<HTMLElement | null>(null);
  const divRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    divRef.current = tableRef.current?.querySelector('div') || null;

    const scrollHandler = async () => {
      if (!divRef.current || isLoadingLogs) {
        return;
      }
      const { scrollTop, scrollHeight, clientHeight } = divRef.current;
      console.log({ a: scrollTop + clientHeight, b: scrollHeight - 100, c: scrollTop + clientHeight >= scrollHeight - 100 });
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        await fetchMore({
          variables: {
            pagination: {
              skip: loadedCount,
              take: 25,
            },
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            return { monitorLogs: mergeLogs(fetchMoreResult.monitorLogs, prev.monitorLogs) };
          },
        });
      }
    };

    divRef.current?.addEventListener('scroll', scrollHandler);
    return () => divRef.current?.removeEventListener('scroll', scrollHandler);
  }, [fetchMore, isLoadingLogs, loadedCount, tableRef]);

  useEffect(() => {
    refetch().then();
    return () => {
      apolloClient.cache.modify({
        fields: { monitorLogs: () => [] as never },
      });
      setLoadedCount(0);
    };
  }, [refetch]);

  return <div className="max-w-[1200px] mx-auto flex flex-col gap-5 mt-5 h-[90vh]">
    <Table
      baseRef={tableRef}
      isHeaderSticky
      classNames={{
        wrapper: 'min-h-[90vh] h-[90vh] max-h-[90vh]',
      }}
      bottomContent={
        <div className={clsx('flex justify-center items-start', { 'hidden': isLoadingLogs })}>
          <Spinner color="white"/>
        </div>
      }
    >
      <TableHeader>
        <TableColumn>ID парсера</TableColumn>
        <TableColumn>Сообщение</TableColumn>
        <TableColumn>Дата</TableColumn>
      </TableHeader>
      <TableBody>
        {logs.map((log) => <TableRow key={log.id}>
          <TableCell className="font-bold">{log.parserId}</TableCell>
          <TableCell>
            <div className={clsx(
              'p-1 rounded-md', {
                'text-black bg-danger-500': log.type === GMonitorLogTypeEnum.Error,
                'text-black bg-warning-500': log.type === GMonitorLogTypeEnum.Warning,
              })}>{log.message}</div>
          </TableCell>
          <TableCell>{dayjs(log.createdAt).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
        </TableRow>)}
      </TableBody>
    </Table>
  </div>;
};
