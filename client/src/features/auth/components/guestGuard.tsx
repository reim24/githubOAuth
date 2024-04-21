import { Navigate } from 'react-router-dom';
import useGetUser from '../../../hooks/useGetUser';
import { ReactNode } from 'react';

export default function GuestGuard({ children }: { children: ReactNode }) {
  const user = useGetUser();

  return <>{!user ? children : <Navigate to={'/dashboard'}></Navigate>}</>;
}
