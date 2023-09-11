import mySaga from './saga/sagas';
import createSagaMiddleware from 'redux-saga'
import bookShelfSlice from '../components/reducer/bookShelfSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]
export const store = configureStore({
  reducer: {
    bookShelfSlice,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({thunk:false}).concat(middleware),
});
sagaMiddleware.run(mySaga)
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
