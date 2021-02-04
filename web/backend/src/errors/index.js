import CustomError from './custom'

class TokenNotFoundError extends CustomError {
  constructor (...params) {
    super('tokenNotFound', ...params)
    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, TokenNotFoundError)
    }
  }
}

class InvalidTokenError extends CustomError {
  constructor (...params) {
    super('invalidToken', ...params)
    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, InvalidTokenError)
    }
  }
}

class InvalidSigninError extends CustomError {
  constructor (...params) {
    super('invalidSignin', ...params)
    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, InvalidSigninError)
    }
  }
}

class InvalidSignupError extends CustomError {
  constructor (...params) {
    super('invalidSignin', ...params)
    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, InvalidSignupError)
    }
  }
}

class InputIdError extends CustomError {
  constructor (...params) {
    super('inputId', ...params)
    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, InputIdError)
    }
  }
}

class InputPwError extends CustomError {
  constructor (...params) {
    super('inputPw', ...params)
    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, InputPwError)
    }
  }
}

class InputNameError extends CustomError {
  constructor (...params) {
    super('inputName', ...params)
    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, InputNameError)
    }
  }
}

class FailToGetBoardError extends CustomError {
  constructor (...params) {
    super('failToGetBoard', ...params)
    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, FailToGetBoardError)
    }
  }
}

class FailToAddBoardError extends CustomError {
  constructor (...params) {
    super('failToAddBoard', ...params)
    if (CustomError.captureStackTrace) {
      CustomError.captureStackTrace(this, FailToAddBoardError)
    }
  }
}

// class  extends CustomError {
//   constructor (...params) {
//     super(, ...params)
//     if (CustomError.captureStackTrace) {
//       CustomError.captureStackTrace(this, )
//     }
//   }
// }

export {
  TokenNotFoundError,
  InvalidTokenError,
  InvalidSigninError,
  InvalidSignupError,
  InputIdError,
  InputPwError,
  InputNameError,
  FailToGetBoardError,
  FailToAddBoardError
}
