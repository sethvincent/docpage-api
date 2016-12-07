var path = require('path')
var xtend = require('xtend')

var reserved = [
  'error',
  'dashboard',
  'admin',
  'login',
  'logout',
  '404',
  '500',
  'auth'
]

var config = {
  shared: {
    host: 'http://127.0.0.1',
    port: 3322,
    secret: 'this is not very secret',
    sitesDir: path.join(__dirname, 'sites'),
    dbDir: path.join(__dirname, 'db'),
    reserved: reserved,
    email: {
      fromEmail: 'hi@example.com',
      postmarkAPIKey: 'your api key'
    }
  },
  development: {},
  staging: {},
  production: {}
}

var env = process.env.NODE_ENV || 'development'
module.exports = xtend(config.shared, config[env])
