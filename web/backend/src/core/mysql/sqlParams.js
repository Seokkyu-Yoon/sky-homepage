const COUNT_BOARD = 30

function selectAllTableNames ({ database = '' }) {
  if (database === '') throw new Error('database is not defined')
  return {
    sql: `
    SELECT table_name as tableName
    FROM information_schema.tables
    WHERE table_schema = ?
    `,
    params: [
      database
    ]
  }
}

function createTableUser () {
  return {
    sql: `
    CREATE TABLE user (
      id VARCHAR(20) NOT NULL,
      pw VARCHAR(20) NOT NULL,
      name VARCHAR(10) NOT NULL,
      PRIMARY KEY (id)
    )
    `,
    params: []
  }
}

function createTableBoard () {
  return {
    sql: `
    CREATE TABLE board (
      id INT NOT NULL AUTO_INCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      upload_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    )
    `,
    params: []
  }
}

function createTableContent () {
  return {
    sql: `
    CREATE TABLE content (
      id INT NOT NULL AUTO_INCREMENT,
      writter VARCHAR(20) NOT NULL,
      type VARCHAR(10) NOT NULL,
      path TEXT NOT NULL,
      size INT NOT NULL,
      unit VARCHAR(5) NOT NULL,
      ext VARCHAR(5) NOT NULL,
      upload_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      FOREIGN KEY (writter) REFERENCES user (id) ON UPDATE CASCADE ON DELETE CASCADE
    )
    `,
    params: []
  }
}

function createTableBoardUser () {
  return {
    sql: `
    CREATE TABLE board_user (
      user_id VARCHAR(20) NOT NULL,
      board_id INT NOT NULL,
      PRIMARY KEY (user_id, board_id),
      FOREIGN KEY (user_id) REFERENCES user (id) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY (board_id) REFERENCES board (id) ON UPDATE CASCADE ON DELETE CASCADE
    )
    `,
    params: []
  }
}

function createTableBoardContent () {
  return {
    sql: `
    CREATE TABLE board_content (
      board_id INT NOT NULL,
      content_id INT NOT NULL,
      PRIMARY KEY (board_id, content_id),
      FOREIGN KEY (board_id) REFERENCES board (id) ON UPDATE CASCADE ON DELETE CASCADE,
      FOREIGN KEY (content_id) REFERENCES content (id) ON UPDATE CASCADE ON DELETE CASCADE
    )
    `,
    params: []
  }
}

function selectUser ({ id = '' }) {
  if (typeof id !== 'string') throw new Error('typeof id is must string')

  if (!id) throw new Error('id must not empty')

  return {
    sql: `
    SELECT *
    FROM user
    WHERE id=?
    `,
    params: [
      id
    ]
  }
}

function insertUser ({ id = '', pw = '', name = '' }) {
  if (typeof id !== 'string') throw new Error('typeof id is must string')
  if (typeof pw !== 'string') throw new Error('typeof pw is must string')
  if (typeof name !== 'string') throw new Error('typeof name is must string')

  if (!id || !pw || !name) throw new Error('id, pw and name must not empty')
  return {
    sql: `
    INSERT INTO user (
      id,
      pw,
      name
    ) VALUES (
      ?,
      ?,
      ?
    )`,
    params: [
      id,
      pw,
      name
    ]
  }
}

function selectBoards ({ startIndex = 0 }) {
  return {
    sql: `
    SELECT *
    FROM board
    LIMIT ? OFFSET ?
    `,
    params: [
      COUNT_BOARD,
      startIndex
    ]
  }
}
function selectBoard ({ id = -1 }) {
  if (typeof id !== 'number') throw new Error('typeof id is must number')
  if (id < 0) throw new Error('id is must upper than 0')

  return {
    sql: `
    SELECT *
    FROM board
    WHERE id=?
    `,
    params: [
      id
    ]
  }
}

function get (action, payload = {}) {
  if (action === 'selectAllTableNames') return selectAllTableNames(payload)
  if (action === 'createTableUser') return createTableUser(payload)
  if (action === 'createTableBoard') return createTableBoard(payload)
  if (action === 'createTableContent') return createTableContent(payload)
  if (action === 'createTableBoardUser') return createTableBoardUser(payload)
  if (action === 'createTableBoardContent') return createTableBoardContent(payload)

  if (action === 'selectUser') return selectUser(payload)
  if (action === 'insertUser') return insertUser(payload)

  if (action === 'selectBoards') return selectBoards(payload)
  if (action === 'selectBoard') return selectBoard(payload)

  throw new Error('not defined action')
}

export default get
