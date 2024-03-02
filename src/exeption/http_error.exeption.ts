import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message, statusCode);
  }

  static notFound() {
    return new CustomHttpException('Not Found Data', HttpStatus.NOT_FOUND);
  }
  static alreadyExists() {
    return new CustomHttpException(
      'Already Exists Data',
      HttpStatus.BAD_REQUEST,
    );
  }

  static badRequest() {
    return new CustomHttpException('Bad Request', HttpStatus.BAD_REQUEST);
  }
}
