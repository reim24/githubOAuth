import { PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '../../../types';
import { createAppSlice } from '../../../app/createAppSlice';

export interface UserSliceState {
  value: TUser | null;
}
const initialState: UserSliceState = {
  value: null,
};
export const userSlice = createAppSlice({
  name: 'user',
  initialState: initialState,
  reducers: (create) => ({
    set: create.reducer((state, action: PayloadAction<TUser>) => {
      state.value = action.payload;
    }),
  }),
  selectors: {
    selectUser: (state) => state.value,
  },
});

export const { set } = userSlice.actions;

export const { selectUser } = userSlice.selectors;
