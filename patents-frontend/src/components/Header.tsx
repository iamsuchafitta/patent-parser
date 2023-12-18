import { observer } from 'mobx-react-lite';
import { ThemeStore } from '../stores/themeStore.ts';
import { FC } from 'react';
import { Button } from '@nextui-org/react';
import {
  usePatentsCountChangedSubscription,
  usePatentsCountQuery,
  useProxyResetMutation,
  useQueueChangedSubscription,
  useQueueLengthQuery,
} from '../api/generated.ts';
import { AddToQueueModal } from './AddToQueueModal.tsx';
import { toast } from 'sonner';
import { apolloClient } from '../api/apollo-client/apollo-client.ts';
import { Link, useLocation } from 'react-router-dom';

export const Header: FC = observer(() => {
  const path = useLocation().pathname;
  const { isDarkMode, toggleTheme } = ThemeStore;
  const [proxyReset, { loading: isLoadingProxyReset }] = useProxyResetMutation({
    onError: (error) => toast.error(`Ошибка сброса прокси: ${error.message}`),
    onCompleted: () => toast.success(`Прокси сброшены`),
  });
  const { data: { patentsCount = 0 } = {} } = usePatentsCountQuery({
    onError: (error) => toast.error(`Ошибка запроса на кол-во патентов: ${error.message}`),
  });
  const { data: { queueLength: { total = 0, processing = 0 } = {} } = {} } = useQueueLengthQuery({
    pollInterval: 5e3,
    onError: (error) => toast.error(`Ошибка запроса на статус очереди: ${error.message}`),
  });
  useQueueChangedSubscription({
    onError: (error) => toast.error(`Ошибка подписки на статус очереди: ${error.message}`),
    onData: (data) => apolloClient.cache.modify({
      fields: { queueLength: () => data.data.data?.queueChanged || { total: 0, processing: 0 } },
    }),
  });
  usePatentsCountChangedSubscription({
    onError: (error) => toast.error(`Ошибка подписки на кол-во патентов: ${error.message}`),
    onData: (data) => apolloClient.cache.modify({
      fields: {
        patentsCount: () => data.data.data?.patentsCountChanged || 0,
      },
    }),
  });

  return (
    <>
      <div className="sticky top-0 z-20 bg-background backdrop-blur bg-opacity-30 flex justify-between px-10 py-3 gap-3 items-center">
        <h1>Кол-во патентов: {patentsCount} шт.</h1>
        <p>Парсинг: {processing}/{total}.</p>
        <Button size="sm" onClick={AddToQueueModal.open}>Добавить в очередь</Button>
        <Button size="sm" onClick={() => proxyReset()} isLoading={isLoadingProxyReset}>Сброс прокси</Button>
        <div className="grow"/>
        {[
          { url: '/', title: 'Патенты', icon: '📄' },
          { url: '/logs', title: 'Журнал', icon: '📝' },
          { url: '/monitor', title: 'Мониторинг', icon: '📊' },
        ].map((item) => (
          <Button
            key={item.url}
            size="sm"
            variant={path === item.url ? 'solid' : 'light'}
            startContent={item.icon}
            as={Link}
            to={item.url}
            className="text-medium font-bold"
          >{item.title}</Button>
        ))}
        <div className="grow"/>
        <Button isIconOnly onClick={toggleTheme} size="sm">
          {isDarkMode ? '🌙' : '☀️'}
        </Button>
      </div>
      <AddToQueueModal/>
    </>
  );
});
