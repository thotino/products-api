const nconf = require('nconf')
nconf.argv().env().file({ file: 'nconf.json' })

module.exports = {
  environment: nconf.get('NODE_ENV'),
  port: nconf.get('APP_SERVER_PORT') || 3000,
  couchBaseHost: 'couchbase://localhost',
  couchBasePort: nconf.get('APP_COUCHBASE_PORT'),
  couchBaseUsername: nconf.get('APP_COUCHBASE_USERNAME') || 'infra',
  couchbasePassword: nconf.get('APP_COUCHBASE_PASSWORD') || 'sensefuel'
}
