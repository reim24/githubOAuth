import axios from 'axios';
import { TUser } from '../../../types';
export type TUserInfo = {
  user: TUser;
  accessToken: string;
};

export async function me(): Promise<TUser | null> {
  try {
    const result: TUser = await (await axios.get(`auth/me`)).data;
    return result;
  } catch (e) {
    return null;
  }
}
