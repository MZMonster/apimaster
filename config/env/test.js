module.exports = {

  port: 8001,

  models: {
    migrate: 'drop',
    connection: 'unitMysqlServer',
  },

  connections: {
    unitMysqlServer: {
      adapter: 'sails-mysql',
      host: process.env.MYSQL_HOST || '127.0.0.1',
      user: process.env.MYSQL_USER || 'root', //optional
      password: process.env.MYSQL_PASSWD || '', //optional
      port: process.env.MYSQL_PORT || '3306', //optional
      database: process.env.MYSQL_DB || 'sscc-unit', //optional
    },
  },

};
