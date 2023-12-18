import { ThemeStore } from './stores/themeStore.ts';
import { Toaster } from 'sonner';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from './pages/layouts/MainLayout.tsx';
import { PatentsTablePage } from './pages/PatentsTablePage.tsx';
import { LogsPage } from './pages/LogsPage.tsx';
import { MonitorPage } from './pages/MonitorPage.tsx';

export const App = observer(() => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<PatentsTablePage/>}/>
          <Route path="logs" element={<LogsPage/>}/>
          <Route path="monitor" element={<MonitorPage/>}/>
        </Route>
      </Routes>

      <Toaster
        richColors
        theme={ThemeStore.isDarkMode ? 'dark' : 'light'}
        position="bottom-right"
        closeButton
      />
    </>
  );
});
