/**
 * @description Router Component lazy loading
 */

import { Suspense, lazy } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Sample from '../pages/error-boundary/ErrorBoundarySample';
import TodoPage from '../pages/todo/TodoPage';
import UserSignOnPage from '../pages/sign-on/UserSignOnPage';
import UiPage from '../pages/ui-sample/UiPage';
import RequestPage from '../pages/react-hook-form/RequestPage';

//https://github.com/ArnaudBarre/eslint-plugin-react-refresh/issues/25
const Main = lazy(() => import('../pages/Main'));
const Layout = lazy(() => import('../components/templates/Layout'));
const EmployeeLogin = lazy(() => import('../pages/employee-login/EmployeeLogin'));
const MenuManagementPage = lazy(() => import('../pages/menu/MenuManagementPage'));

//service
const FeedPage = lazy(() => import('../pages/feed/FeedPage'));
const BbsListPage = lazy(() => import('../pages/bbs-prefetch/BbsListPage'));
const ReservationPage = lazy(() => import('../pages/reservation/ReservationPage'));

const routes = [
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/ui',
    element: <UiPage />,
  },
  {
    path: '/login',
    element: <Outlet />,
    children: [
      {
        path: 'employee',
        element: <EmployeeLogin />,
      },
    ],
  },
  {
    path: '/domain',
    element: (
      <Suspense fallback={<Main />}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        path: 'bbs',
        element: <BbsListPage />,
      },
      {
        path: 'reservation',
        element: <ReservationPage />,
      },
      {
        path: 'feed',
        element: <FeedPage />,
      },
      {
        path: 'todo',
        element: <TodoPage />,
      },
      {
        path: 'sign-on',
        element: <UserSignOnPage />,
      },
      {
        path: 'request',
        element: <RequestPage />,
      },
    ],
  },
  {
    path: '/admin',
    element: <Outlet />,
    children: [
      {
        path: 'menu-management',
        element: <MenuManagementPage />,
      },
    ],
  },
  {
    path: '/example',
    element: <Outlet />,
    children: [
      {
        path: 'a',
        element: <Sample />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};
