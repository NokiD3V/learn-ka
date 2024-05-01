module.exports = {
  HOST: '147.78.67.26',
  USER: 'username',
  PASSWORD: 'password',
  DB: 'learnka',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
