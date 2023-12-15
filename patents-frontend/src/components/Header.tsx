import { observer } from 'mobx-react-lite';
import { ThemeStore } from '../stores/themeStore.ts';
import { FC } from 'react';
import { Button } from '@nextui-org/react';
import { usePatentsCountQuery, useQueueLengthQuery } from '../api/generated.ts';
import { AddToQueueModal } from './AddToQueueModal.tsx';
import { toast } from 'sonner';

export const Header: FC = observer(() => {
  const { isDarkMode, toggleTheme } = ThemeStore;
  const { data: { patentsCount = 0 } = {} } = usePatentsCountQuery({
    pollInterval: 1e3,
    onError: (error) => toast.error(`Ошибка загрузки кол-ва патентов: ${error.message}`),
  });
  const { data: { queueLength: { total = 0, processing = 0 } = {} } = {} } = useQueueLengthQuery({
    pollInterval: 1e3,
    onError: (error) => toast.error(`Ошибка статуса очереди: ${error.message}`),
  });

  return (
    <div className="sticky top-0 z-20 bg-background backdrop-blur bg-opacity-30 flex justify-between px-10 py-3 gap-3 items-center">
      <h1>Парсер патентов: {patentsCount} шт.</h1>
      <p>Парсинг: {processing}/{total}.</p>
      <Button size="sm" onClick={AddToQueueModal.open}>Добавить в очередь</Button>
      <div className="grow"/>
      <Button isIconOnly onClick={toggleTheme} size="sm">
        {isDarkMode ? '🌙' : '☀️'}
      </Button>
    </div>
  );
});
