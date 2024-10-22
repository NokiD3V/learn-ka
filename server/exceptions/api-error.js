// Классификация ошибки при запросе, упрощает создание ошибки и возвращение клиенту
module.exports = class ApiError extends Error {
  status
  errors

  constructor (status, message, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError () {
    return new ApiError(401, 'Пользователь не авторизован')
  }

  static BadRequest (message, errors = []) {
    if(errors.length < 1) errors.push(message)
    return new ApiError(400, message, errors)
  }
}
