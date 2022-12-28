import { AuthSlice } from './auth.state';
import { call, getContext, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AccountService } from '../../../service/account.service';
import { AuthDto } from '@newgate/dto';
import JWT from 'jwt-decode';
import { Claim } from '@newgate/model';

export function* signinSaga(
  action: PayloadAction<{ email: string; password: string }>
) {
  yield put(AuthSlice.actions.pending());
  const accountService: AccountService = yield getContext('accountService');
  try {
    const result: AuthDto = yield call(() =>
      accountService.signin(action.payload.email, action.payload.password)
    );
    const parsedToken: Claim = JWT(result.accessToken);
    yield put(
      AuthSlice.actions.signedin({
        status: 'SUCCESS',
        data: {
          parsedToken,
          isAuthenticated: true,
          accessToken: result.accessToken,
        },
        updatedAt: new Date(),
        message: undefined,
      })
    );
  } catch (e: unknown) {
    yield put(
      AuthSlice.actions.failed({
        message: (e as Error).message,
      })
    );
  }
}

export function* syncSaga() {
  yield put(AuthSlice.actions.pending());
  const accountService: AccountService = yield getContext('accountService');
  try {
    const result: AuthDto = yield call(() => accountService.getSession());
    const parsedToken: Claim = JWT(result.accessToken);
    yield put(
      AuthSlice.actions.signedin({
        status: 'SUCCESS',
        data: {
          parsedToken,
          isAuthenticated: true,
          accessToken: result.accessToken,
        },
        message: undefined,
        updatedAt: new Date(),
      })
    );
  } catch (e: unknown) {
    yield put(
      AuthSlice.actions.failed({
        message: (e as Error).message,
      })
    );
  }
}
