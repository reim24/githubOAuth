import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import GuestGuard from '../components/guestGuard';
import AuthGuard from '../components/authGuard';

const LoginPage = lazy(() => import('./login'));
const RedirectPage = lazy(() => import('./redirect'));
const FailurePage = lazy(() => import('./failure'));
const LogoutPage = lazy(() => import('./logout'));

const auth = {
  element: (
    <Suspense fallback={<>loading...</>}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: '',
      element: (
        <GuestGuard>
          <LoginPage />
        </GuestGuard>
      ),
    },
    {
      path: 'redirect',
      element: (
        <GuestGuard>
          <RedirectPage />
        </GuestGuard>
      ),
    },
    {
      path: 'failure',
      element: (
        <GuestGuard>
          <FailurePage />
        </GuestGuard>
      ),
    },
    {
      path: 'logout',
      element: (
        <AuthGuard>
          <LogoutPage />
        </AuthGuard>
      ),
    },
  ],
};

export const authRoutes = [
  {
    children: [auth],
  },
];
