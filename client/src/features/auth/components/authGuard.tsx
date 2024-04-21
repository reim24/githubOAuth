import { Navigate } from 'react-router-dom';
import useGetUser from '../../../hooks/useGetUser';
import { ReactNode } from 'react';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const user = useGetUser();

  return <>{user ? children : <Navigate to={'/'}></Navigate>}</>;
}
