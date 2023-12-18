import { FC } from 'react';
import { Header } from '../../components/Header.tsx';
import { Outlet } from 'react-router-dom';

export const MainLayout: FC = () => {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
};