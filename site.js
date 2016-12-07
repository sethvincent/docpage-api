var fs = require('fs')
var path = require('path')
var inherits = require('util').inherits
var Model = require('level-model')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')
var pump = require('pump')

module.exports = Site
inherits(Site, Model)

function Site (db, config) {
  if (!(this instanceof Site)) return new Site(db, config)
  this.sitesDir = config.sitesDir
  this.reserved = config.reserved

  var opts = {
    modelName: 'site',
    properties: {
      slug: { type: 'string' },
      url: { type: 'string' },
      json: { type: 'string' },
      html: { type: 'string' },
      deploys: { type: 'number', default: 0 },
      owners: { type: 'array', default: [] }
    },
    indexKeys: ['slug', 'owners'],
    required: ['slug']
  }

  Model.call(this, db, opts)
}

Site.prototype.beforeCreate = function (data) {
  data.deploys = 1
  return data
}

Site.prototype.beforeUpdate = function (data) {
  data.deploys++
  return data
}

Site.prototype.findBySlug = function findBySlug (slug, callback) {
  this.findOne('slug', slug, function (err, site) {
    if (err) return callback(new Error('Not found'))
    callback(null, site)
  })
}

Site.prototype.writeFile = function (stream, slug) {
  var dir = path.join(this.sitesDir, slug)
  var filepath = path.join(dir, 'index.html')

  this.resetDir(dir, function (err) {
    if (err) console.log(err)
    var writeStream = fs.createWriteStream(filepath)
    pump(stream, writeStream)
  })
}

Site.prototype.resetDir = function resetDir (dir, callback) {
  rimraf(dir, function (err) {
    if (err) return callback(err)
    mkdirp(dir, callback)
  })
}
