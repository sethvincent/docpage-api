var http = require('http')
var level = require('level-party')
var township = require('township')
var createApp = require('appa')

var send = require('appa/send')
var error = require('appa/error')
var config = require('./config')

var db = level(config.dbDir)
var ship = township(config, db)
var app = createApp()
var log = app.log

var site = require('./site-handlers')(db, config)

app.on('/', function (req, res, ctx) {
  send({
    docpage: 'simple documentation sites from a single markdown file',
    docs: 'https://docpage.org'
  }).pipe(res)
})

app.on('/sites', function (req, res, ctx) {
  ctx.slug = req.headers.slug

  if (req.method === 'GET') {
    site.list(req, res, ctx).pipe(res)
  } else if (req.method === 'POST') {
    ship.verify(req, res, function (err, decoded, token) {
      if (err) return error(400, err.message).pipe(res)
      if (!decoded) return error(403, 'Not authorized').pipe(res)
      var slug = req.headers.slug

      site.get(slug, function (err, obj) {
        if (err && err.message === 'Not found') {
          // ignore
        } else if (err) {
          return error(400, err.message).pipe(res)
        }

        if (obj) {
          if (obj.owners.indexOf(decoded.auth.key) > -1) {
            site.deploy(req, res, ctx, function (err, obj) {
              if (err) return error(400, err.message).pipe(res)
              send(obj).pipe(res)
            })
          } else {
            return error(403, 'Not authorized').pipe(res)
          }
        } else {
          ctx.owners = [decoded.auth.key]
          site.deploy(req, res, ctx, function (err, obj) {
            if (err) return error(400, err.message).pipe(res)
            send(obj).pipe(res)
          })
        }
      })
    })
  } else {
    send().pipe(res)
  }
})

app.on('/sites/:slug', function (req, res, ctx) {
  if (req.method === 'GET') {
    site.get(ctx.params.slug, function (err, obj) {
      if (err) return error(400, err.message).pipe(res)
      send(obj).pipe(res)
    })
  } else {
    send().pipe(res)
  }
})

app.on('/register', function (req, res, ctx) {
  ship.register(req, res, ctx, function (err, statusCode, obj) {
    if (err) return error(400, err.message).pipe(res)
    send(obj).pipe(res)
  })
})

app.on('/login', function (req, res, ctx) {
  ship.login(req, res, ctx, function (err, code, token) {
    if (err) return error(400, err.message).pipe(res)
    send(token).pipe(res)
  })
})

app.on('/logout', function (req, res, ctx) {

})

http.createServer(app).listen(config.port, function () {
  log.info(`server started on http://127.0.0.1:${config.port}`)
})
