export enum CrudCode {
  CREATE = 'C',
  READ = 'R',
  UPDATE = 'U',
  DELETE = 'D',
}

export interface Action {
  action: CrudCode;
}
