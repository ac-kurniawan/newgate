import { AuthSlice } from './auth.state'
import { call, getContext, put } from "redux-saga/effects";
import {PayloadAction} from "@reduxjs/toolkit";
import {AccountService} from "../../../service/account.service";
import {AuthDto} from "@newgate/dto";
export function* signinSaga(action: PayloadAction<{email: string, password: string}>) {
  yield put(AuthSlice.actions.pending())
  const accountService: AccountService = yield getContext('accountService')
  try {
    const result: AuthDto = yield call(() => accountService.signin(action.payload.email, action.payload.password))
    yield put(AuthSlice.actions.signedin({
      status: 'SUCCESS',
      data: {
        isAuthenticated: true,
        accessToken: result.accessToken,
        parsedToken: {
          sub: '123123',
          exp: new Date()
        }
      },
      updatedAt: new Date()
    }))
  } catch (e: unknown) {
    yield put(AuthSlice.actions.failed({
      message: (e as Error).message
    }))
  }
}
