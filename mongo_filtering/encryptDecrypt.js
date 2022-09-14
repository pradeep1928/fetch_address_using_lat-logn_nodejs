const crypto = require('crypto')

class EncryptDecryt {
  constructor () {
    this.cryptoConfigObject = {
      masterKey: process.env.LOG_ENCRYPTIION_MASTER_KEY || 'sfcpnnjFG6dULJfo1BEGqczpfN0SmwZ6bgKO5FcDRfI=',
      iv: process.env.LOG_ENCRYPTIION_IV || 'fd12da1c45d208fe82d49102f25e2195',
      salt: process.env.LOG_ENCRYPTIION_SALT || '5655a72376b3d118e48fe6620493b82b66af53c71ba838a874adc027818130e99f3543024bbac47b9afafb7639e50d6d799ecefde16359a836a3e989db033b3f',
      iterations: process.env.ITERATIONS?parseInt(process.env.ITERATIONS):10,
      keyLength: process.env.KEYLENGTH?parseInt(process.env.KEYLENGTH):32,
      digest: 'sha512'
    }
  }

  encryptData (text) {
    try {
      // static initialization vector for search
      const iv = Buffer.from(this.cryptoConfigObject.iv, 'hex')
      // static salt for search
      const salt = Buffer.from(this.cryptoConfigObject.salt, 'hex')
      // derive encryption key
      const key = crypto.pbkdf2Sync(this.cryptoConfigObject.masterKey, salt, this.cryptoConfigObject.iterations, this.cryptoConfigObject.keyLength, this.cryptoConfigObject.digest)
      // AES 256 GCM Mode
      const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
      // encrypt the given text
      const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
      // extract the auth tag
      const tag = cipher.getAuthTag()
      // generate output
      return Buffer.concat([salt, iv, tag, encrypted]).toString('base64')
    } catch (err) {
      console.log('Caught error in  EncryptData Func :: error', err)
      return err
    }
  }

  decryptData (encdata) {
    try {
      // base64 decoding
      const bData = Buffer.from(encdata, 'base64')
      // convert data to buffers
      const salt = bData.slice(0, 64)
      const iv = bData.slice(64, 80)
      const tag = bData.slice(80, 96)
      const text = bData.slice(96)
      // derive key using; 32 byte key length
      const key = crypto.pbkdf2Sync(this.cryptoConfigObject.masterKey, salt, this.cryptoConfigObject.iterations, this.cryptoConfigObject.keyLength, this.cryptoConfigObject.digest)
      // AES 256 GCM Mode
      const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
      decipher.setAuthTag(tag)
      return decipher.update(text, 'binary', 'utf8') + decipher.final('utf8')
    } catch (err) {
      console.log('Caught error in  DecryptData Func :: error', err)
      return err
    }
  }
}

module.exports = EncryptDecryt