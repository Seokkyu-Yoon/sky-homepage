function formatting (value) {
  if (typeof value !== 'string') return value
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, '\\\'')}'`
}

function getSelectAllTableNames ({ database = '' }) {
  if (database === '') throw new Error('database is not defined')
  return `
  SELECT table_name as tableName
  FROM information_schema.tables
  WHERE table_schema = ${formatting(database)}
  `
}

function getSelectUser ({ id = '' }) {
  return ``
}

function getCreateTableUser () {
  return `
  CREATE TABLE user (
    id VARCHAR(20) NOT NULL,
    pw VARCHAR(20) NOT NULL,
    name VARCHAR(10) NOT NULL,
    PRIMARY KEY (id)
  )
  `
}

function getCreateTableBoard () {
  return `
  CREATE TABLE board (
    id INT NOT NULL AUTO_INCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    upload_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  )
  `
}

function getCreateTablePhoto () {
  return `
  CREATE TABLE photo (
    id INT NOT NULL AUTO_INCREMENT,
    path TEXT NOT NULL,
    size INT NOT NULL,
    unit VARCHAR(5) NOT NULL,
    ext VARCHAR(5) NOT NULL,
    upload_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
  )
  `
}

function getCreateTableBoardUser () {
  return `
  CREATE TABLE board_user (
    user_id VARCHAR(20) NOT NULL,
    board_id INT NOT NULL,
    PRIMARY KEY (user_id, board_id),
    FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (board_id) REFERENCES board (id) ON UPDATE CASCADE ON DELETE CASCADE
  )
  `
}

function getCreateTableBoardPhoto () {
  return `
  CREATE TABLE board_photo (
    board_id INT NOT NULL,
    photo_id INT NOT NULL,
    PRIMARY KEY (board_id, photo_id),
    FOREIGN KEY (board_id) REFERENCES board (id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (photo_id) REFERENCES photo (id) ON UPDATE CASCADE ON DELETE CASCADE
  )
  `
}

function get (action, payload = {}) {
  if (action === 'selectAllTableNames') return getSelectAllTableNames(payload)
  if (action === 'selectUser') return getSelectUser(payload)
  if (action === 'createTableUser') return getCreateTableUser(payload)
  if (action === 'createTableBoard') return getCreateTableBoard(payload)
  if (action === 'createTablePhoto') return getCreateTablePhoto(payload)
  if (action === 'createTableBoardUser') return getCreateTableBoardUser(payload)
  if (action === 'createTableBoardPhoto') return getCreateTableBoardPhoto(payload)
  throw new Error('not defined action')
}

export default get
