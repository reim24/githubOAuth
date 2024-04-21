import { useRoutes } from 'react-router-dom';
import { authRoutes } from '../features/auth/routes';
import { dashboardRoutes } from '../features/dashboard/routes';

export default function AppRouter() {
  return useRoutes([...authRoutes, ...dashboardRoutes]);
}
