const ConfigPino = {
  prettyPrint: {
    colorize: true
  },
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info'
}

const ConfigMysql = {
  host: process.env.MYSQL_IP,
  port: Number(process.env.MYSQL_PORT),
  database: process.env.MYSQL_DATABASE,
  user: 'root',
  password: 'qwer1234',
  timezone: 'Asia/Seoul',
  charset: 'utf8mb4'
}

export {
  ConfigPino,
  ConfigMysql
}
