import { Header } from './components/Header.tsx';
import { PatentsTable } from './components/PatentsTable.tsx';
import { ThemeStore } from './stores/themeStore.ts';
import { Toaster } from 'sonner';
import { AddToQueueModal } from './components/AddToQueueModal.tsx';
import { observer } from 'mobx-react-lite';

export const App = observer(() => {
  // const {
  //   data: { queueLength } = {},
  //   loading: isLoadingQueue,
  //   error: errorQueue,
  // } = useQueueLengthQuery();

  return (
    <>
      <Header/>
      <PatentsTable/>
      <Toaster
        richColors
        theme={ThemeStore.isDarkMode ? 'dark' : 'light'}
        position="bottom-right"
        closeButton
      />
      <AddToQueueModal/>
    </>
  );
});
