export enum Endpoit {
  users = '/api/users',
}
export const regular = new RegExp(
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
);

export enum Messages {
  empty = 'Record not found',
  InternalError = 'Internal Server Error',
  invalidId = 'Invalid ID',
  notEnoughData = 'Not enough data',
  userDeleted = 'User deleted',
}
