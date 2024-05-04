import { StateCreator } from 'zustand';
import { TabsState } from '../tabsSlice';

type UserInfo = {
  username: string;
  lastLogin: string;
  roleName: string;
};

export interface UserInfoState {
  userInfo: UserInfo;
  updateUserInfo: (userInfo: UserInfo) => void;
}
export const createUserInfoSlice: StateCreator<TabsState & UserInfoState, [], [], UserInfoState> = (
  set,
) => ({
  userInfo: { username: '', lastLogin: '', roleName: '' },
  updateUserInfo: (userInfo: UserInfo) => set({ userInfo }),
});
