import { lazy, Suspense } from 'react';
import AuthGuard from '../../auth/components/authGuard';
import DashboardLayout from '../layout';

const DashboardPage = lazy(() => import('./dashboard'));
const RepoPage = lazy(() => import('./repo'));

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <Suspense fallback={<>loading...</>}>
        <DashboardLayout />
      </Suspense>
    ),
    children: [
      {
        path: '',
        element: (
          <AuthGuard>
            <DashboardPage />
          </AuthGuard>
        ),
      },
      {
        path: 'repo/:name',
        element: (
          <AuthGuard>
            <RepoPage />
          </AuthGuard>
        ),
      },
    ],
  },
];
