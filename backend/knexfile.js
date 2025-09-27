module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: './src/migrations'
    },
    useNullAsDefault: true
  },
  
  production: {
    client: 'sqlite3',
    connection: {
      filename: './prod.sqlite3'
    },
    migrations: {
      directory: './src/migrations'
    },
    useNullAsDefault: true
  }
};