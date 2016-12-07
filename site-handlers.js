var fs = require('fs')
var path = require('path')
var JSONStream = require('JSONStream')
var multiparty = require('multiparty')
var through = require('through2')
var pump = require('pump')

module.exports = function (db, config) {
  var site = require('./site')(db, config)

  return {
    get: get,
    list: list,
    deploy: deploy
  }

  function get (slug, callback) {
    site.findBySlug(slug, callback)
  }

  function list (req, res, ctx) {
    function write (data, enc, next) {
      this.push({
        key: data.key,
        slug: data.slug,
        created: data.created,
        updated: data.updated
      })

      next()
    }

    var read = site.createReadStream({ keys: false })
    return pump(read, through.obj(write), JSONStream.stringify())
  }

  function deploy (req, res, ctx, callback) {
    var slug = ctx.slug
    var owners = ctx.owners

    var dir = path.join(site.sitesDir, slug)
    var filepath = path.join(dir, 'index.html')

    if (site.reserved.indexOf(slug) > -1) {
      return callback(new Error('name not available'))
    }

    site.resetDir(dir, function (err) {
      if (err) console.log(err)

      var form = new multiparty.Form({
        autoFiles: true
      })

      function save (obj) {
        form.on('file', function (filename, file) {
          fs.rename(file.path, filepath, function (err) {
            if (err) console.log(err)
            fs.readFile(filepath, function (err, content) {
              if (err) console.log(err)
              obj.html = content.toString()
              obj.owners = owners
              site.save(obj, callback)
            })
          })
        })

        form.parse(req)
      }

      site.findBySlug(slug, function (err, existing) {
        var obj = {
          slug: slug,
          url: 'http://127.0.0.1:3322/' + slug,
          json: 'http://127.0.0.1:3322/sites/' + slug
        }

        if (!err && ctx) {
          // TODO: if exists and user not owner: return error
          obj.key = existing.key
          save(obj)
        } else {
          save(obj)
        }
      })
    })
  }
}
