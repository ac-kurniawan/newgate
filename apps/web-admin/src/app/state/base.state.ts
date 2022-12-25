export interface BaseState {
  status: 'INIT' | 'PENDING' | 'SUCCESS' | 'FAILED';
  message?: string;
  loading?: 'GLOBAL' | 'COMPONENT';
}
export interface BaseAction<T> {
  type: string;
  payload: T;
}
