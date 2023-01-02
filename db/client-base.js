const { connect, start, close } = require('ottoman')
const EventEmitter = require('events')
const { couchBaseUsername, couchbasePassword } = require('../config')

// // Instantiate Ottoman
// const { Ottoman, start } = require('ottoman')
// const ottoman = new Ottoman({ collectionName: '_default' })
// ottoman.connect({
//   connectionString: 'couchbase://0.0.0.0:8091',
//   bucketName: 'shop',
//   username: couchBaseUsername,
//   password: couchbasePassword
// }).then(() => {
//   start()
// }).then(() => {
//   console.log('Connected with the datastore')
// }).catch((err) => {
//   console.error(err)
// })

class CouchbaseClient extends EventEmitter {
  constructor(connectionOptions = {
    connectionString: 'couchbase://0.0.0.0:8091',
    bucketName: 'sensefuel',
    username: couchBaseUsername,
    password: couchbasePassword
  }) {
    super()
    this.options = connectionOptions
    this.db = null
    // this.url = this.options.url
    this.open = this.open.bind(this)
    this.open()
  }

  async open() {
    if (this.db) {
      await this.close()
      await this.open()
    }
    console.log({ ...this.options })
    const connection = await connect({ ...this.options })
    console.log({ ...connection })
    // connection.on('error', (error) => { this.emit('error') })
    this.db = connection
    this.registerModels()
    // connection.once('open', () => { this.emit('open') })
    start()
    this.emit('open')
  }

  async close() {
    await close()
    this.db.removeAllListeners()
    this.db = null
    this.emit('close')
  }
  
  async reopen() {
    if (this.db) {
      await this.close()
      await this.open()
    }
    return this.open();
  }

  registerModels() {
    throw new Error("Base client is an abstract class. Please extend and implement abstract methods");
  }
}

module.exports = { CouchbaseClient }
