import { me } from '../../features/auth/api';
import axiosInit from './axios';

const initApp = async () => {
  await axiosInit();

  const currentUser = await me();

  return currentUser;
};
export default initApp;
