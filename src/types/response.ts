export interface Response<T = undefined, Q extends boolean = false> {
  success: boolean;
  code: number;
  message: string;
  payload: T extends Array<infer U>
    ? Q extends true
      ? { total: number; pageCount: number; pageSize: number; result: U[] }
      : { total: number; result: U[] }
    : T;
}
