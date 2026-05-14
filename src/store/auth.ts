import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  verfied: boolean;
  avatar?: string;
  followers: number;
  following: number;
}

interface AuthState {
  profile: UserProfile | null;
  loggedIn: boolean;
  busy: boolean;
}

const initialState: AuthState = {
  profile: null,
  loggedIn: false,
  busy: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateProfile(authState, { payload }: PayloadAction<UserProfile | null>) {
      authState.profile = payload;
    },
    updateLoggedInState(authState, { payload }) {
      authState.loggedIn = payload;
    },
    updateBusyState(authState, { payload } : PayloadAction<boolean>) {
      authState.busy = payload;
    },
  },
});

export const { updateProfile, updateLoggedInState, updateBusyState } =
  slice.actions;
const getAuthState = createSelector(
  (state: any) => state,
  authState => authState,
);
export { getAuthState };

export default slice.reducer;
