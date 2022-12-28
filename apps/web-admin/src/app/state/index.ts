import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { newAccountService } from '../../service/account.service';
import { AuthSlice } from './auth/auth.state';
import createSagaMiddleware from 'redux-saga';
import { signinSaga, syncSaga } from './auth/auth.saga';
import { takeLatest } from 'redux-saga/effects';

export const Dependencies: Record<string, any> = {
  accountService: newAccountService(),
};

function* RootSaga() {
  yield takeLatest(AuthSlice.actions.signin.type, signinSaga);
  yield takeLatest(AuthSlice.actions.sync.type, syncSaga);
}

const sagaMiddleware = createSagaMiddleware({
  context: {
    ...Object.keys(Dependencies).reduce((acc, val, index) => {
      return {
        ...acc,
        [val]: Dependencies[val],
      };
    }, {}),
  },
});

export const store = configureStore({
  middleware: [sagaMiddleware],
  reducer: {
    auth: AuthSlice.reducer,
  },
});

sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
