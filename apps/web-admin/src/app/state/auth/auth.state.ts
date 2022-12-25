import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseState } from '../base.state';

export interface AuthState extends BaseState {
  data?: {
    isAuthenticated: boolean;
    accessToken: string;
    parsedToken: {
      sub: string;
      exp: Date;
    };
  };
  updatedAt?: Date;
}

export const initialAuthState: AuthState = {
  status: 'INIT',
};

export const AuthSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    pending: (state) => {
      return {
        ...state,
        status: 'PENDING'
      }
    },
    failed: (state, action: PayloadAction<{message: string}>) => {
      return {
        ...state,
        status: 'FAILED',
        message: action.payload.message
      }
    },
    signin: (state, action: PayloadAction<{email: string, password: string}>) => {
      return {
        ...state,
      };
    },
    signedin: (state, action: PayloadAction<AuthState>) => {
      return {
        ...state,
        ...action,
      };
    },
  },
});
