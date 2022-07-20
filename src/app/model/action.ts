export type ActionType = 'add' | 'update' | 'delete' | 'cancel';

export interface Action<T> {
  item: T;
  action: ActionType;
}
