//http://www.scotchmedia.com/tutorials/express/authentication/3/02
//Send mail with templates

var path = require('path')
  , fs = require('fs')
  , rootPath = path.normalize(__dirname + '/..')
  , templatePath = path.normalize(__dirname + '/../mailer/templates')
  , notifier = {
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      postmarkKey: '6b64620a-caf4-40cf-85d8-adb3d4b5c683'
    }


module.exports = {
  development: {
    db: 'mongodb://localhost/beThere-dev',
    root: rootPath,
    notifier: notifier,
    HTTPDomain: 'http://localhost',
    HTTPport : 3000,
    HTTPSport : 8000,
    smsGateway: 'http://89.101.92.239:9090/',
    app: {
      name: 'beThere - Development'
    },
    certs : {
      key: fs.readFileSync('certs/dev/key.pem'),
      cert: fs.readFileSync('certs/dev/cert.pem')
    }
  },
  test: {
    db: 'mongodb://localhost/beThere-test',
    root: rootPath,
    notifier: notifier,
    HTTPport : 3000,
    HTTPSport : 8000,
    smsGateway: 'http://89.101.34.173:9090/sendsms',
    app: {
      name: 'beThere - Test'
    }
  },
  production: {
    db: 'mongodb://localhost/beThere',
    root: rootPath,
    notifier: notifier,
    HTTPport : 80,
    HTTPSport : 443,
    app: {
      name: 'beThere - Production'
    },
    certs : {
      key: fs.readFileSync('certs/dev/key.pem'),
      cert: fs.readFileSync('certs/dev/cert.pem')
    }
  }
}

