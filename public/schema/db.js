// Instantiate Couchbase and Ottoman
const { Ottoman, start } = require('ottoman');
const ottoman = new Ottoman({ collectionName: '_default' })
ottoman.connect({
    connectionString: 'couchbase://localhost',
    bucketName: 'shop',
    username: 'infra',
    password: 'sensefuel'
  }).then(() => { start() })