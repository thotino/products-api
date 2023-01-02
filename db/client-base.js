const { Ottoman } = require('ottoman')
const EventEmitter = require('events')
const { couchBaseUsername, couchbasePassword } = require('../config')

class CouchbaseClient extends EventEmitter {
  constructor(connectionOptions = {
    connectionString: 'couchbase://0.0.0.0:8091',
    bucketName: 'shop',
    username: couchBaseUsername,
    password: couchbasePassword
  }) {
    super()
    this.options = connectionOptions
    this.connection = null    
    // this.url = this.options.url
    // this.open = this.open.bind(this)
    this.open()
  }

  async open() {
      // if (this.connection) {
      //   await this.close()
      //   await this.open()
      // }
      const ottoman = new Ottoman({ collectionName: '_default' })
      this.connection = await ottoman.connect({ ...this.options })
      this.connection.on('error', (error) => { this.emit('error') })
      this.registerModels()
      this.connection.start()
      this.emit('open')  
  }

  async close() {
    await this.connection.close()
    this.connection.removeAllListeners()
    this.connection = null
    this.emit('close')
  }
  
  async reopen() {
    // if (this.connection) {
    //   await this.close()
    //   await this.open()
    // }
    return this.open();
  }

  registerModels() {
    throw new Error("Base client is an abstract class. Please extend and implement abstract methods");
  }
}

module.exports = { CouchbaseClient }
