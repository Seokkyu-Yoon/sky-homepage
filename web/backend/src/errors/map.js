const CODE_MAP = {}
const MESSAGE_MAP = {}

function add (...params) {
  params.forEach(({ key, code, message }) => {
    if (typeof CODE_MAP[key] !== 'undefined') throw new Error(`key[${key}] already used`)
    CODE_MAP[key] = code
    MESSAGE_MAP[key] = message
  })
}

// token not found
const TOKEN_NOT_FOUND = {
  key: 'TOKEN_NOT_FOUND',
  code: 100,
  message: '토큰을 찾을 수 없습니다'
}

// invalid token
const INVALID_TOKEN = {
  key: 'INVALID_TOKEN',
  code: 101,
  message: '유효하지 않은 토큰입니다'
}
add(TOKEN_NOT_FOUND, INVALID_TOKEN)

const INVALID_SIGN_IN = {
  key: 'INVALID_SIGN_IN',
  code: 201,
  message: '아이디와 비밀번호를 확인해주세요'
}

const INVALID_SIGN_UP = {
  key: 'INVALID_SIGN_UP',
  code: 202,
  message: '이미 존재하는 아이디입니다'
}
add(INVALID_SIGN_IN, INVALID_SIGN_UP)

const INPUT_ID = {
  key: 'INPUT_ID',
  code: 301,
  message: '아이디를 입력해주세요'
}

const INPUT_PW = {
  key: 'INPUT_PW',
  code: 302,
  message: '비밀번호를 입력해주세요'
}

const INPUT_NAME = {
  key: 'INPUT_NAME',
  code: 303,
  message: '이름을 입력해주세요'
}
add(INPUT_ID, INPUT_PW, INPUT_NAME)

export {
  CODE_MAP,
  MESSAGE_MAP
}
