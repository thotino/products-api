const { couchBaseUsername, couchbasePassword } = require('./config')
console.log({ couchBaseUsername, couchbasePassword })
// Instantiate Couchbase and Ottoman
const { Ottoman, start } = require('ottoman')
const ottoman = new Ottoman({ collectionName: '_default' })
ottoman.connect({
  connectionString: 'couchbase://localhost',
  // connectionString: '127.0.0.1:8091',
  bucketName: 'shop',
  username: couchBaseUsername,
  password: couchbasePassword
}).then(() => { 
  start()
}).then(() => {
  console.log('Connected with the datastore')
}).catch((err) => {
  console.error(err)
})
