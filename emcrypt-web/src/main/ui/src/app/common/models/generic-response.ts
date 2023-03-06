export class GenericResponse {
  code: number;
  message: string;
}

export class GenericDataResponse<T> extends GenericResponse {
  data: T;
}
