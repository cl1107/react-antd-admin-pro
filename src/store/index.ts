import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TabsState, createTabsSlice } from './tabsSlice';
import { UserInfoState, createUserInfoSlice } from './userInfoSlice';

export const useGlobalStore = create<TabsState & UserInfoState>()(
  devtools(
    persist(
      (...a) => ({
        ...createUserInfoSlice(...a),
        ...createTabsSlice(...a),
      }),
      { name: 'userInfo', partialize: (state) => ({ userInfo: state.userInfo }) }, // 挑选需要持久化的数据
    ),
  ),
);
