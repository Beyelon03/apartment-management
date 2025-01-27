export class ApiError extends Error {
  status: number;
  errors: any[];

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string = 'Bad Request: Некорректный запрос.', errors: any[] = []) {
    return new ApiError(400, message, errors);
  }

  static NotFound(message: string = 'Not Found: Запрашиваемый ресурс не найден.') {
    return new ApiError(404, message);
  }

  static InternalServerError(message: string = 'Internal Server Error: Внутренняя ошибка сервера.') {
    return new ApiError(500, message);
  }
}
