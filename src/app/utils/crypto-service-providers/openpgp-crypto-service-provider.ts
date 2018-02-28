import * as openpgp from 'openpgp'
import { Buffer as _Buffer } from 'buffer/'
import { ICryptoServiceProvider, ICryptoSignature, ICryptoKeysPair } from 'app/services/crypto.service'

declare var window: any

export class OpenPGPCryptoServiceProvider implements ICryptoServiceProvider {

  constructor() {}

  public async generateKey(options: any): Promise<ICryptoKeysPair> {
    return openpgp.generateKey(options).then((key) => {
        const privKey = key.privateKeyArmored // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
        const pubKey = key.publicKeyArmored   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
        return {
          privateKey: privKey,
          publicKey: pubKey
        }
    })

  }

  public async sign(data: any, signer: any): Promise<ICryptoSignature> {
    const passphrase = 'theseam'
    const privKeyObj = openpgp.key.readArmored(signer.keys.private).keys[0]
    privKeyObj.decrypt(passphrase)

    const options = {
      data: data, // input as String (or Uint8Array)
      privateKeys: privKeyObj, // for signing
      detached: true
    }

    return openpgp.sign(options).then(function(signed) {
      const detachedSig = signed.signature
      return {
        signature: detachedSig
      }
    })
  }

  public async verify(data: any, signer: any): Promise<any> {
    const cleartext = data
    const options = {
      message: openpgp.cleartext.readArmored(cleartext), // parse armored message
      publicKeys: openpgp.key.readArmored(signer.keys.public).keys   // for verification
    }

    return openpgp.verify(options).then(function(verified) {
      const validity = verified.signatures[0].valid
      return verified
    })
  }

  public async encrypt(data: any, signer: any, filename: string = null): Promise<any> {
    // const passphrase = 'theseam'
    // const privKeyObj = openpgp.key.readArmored(signer.keys.private).keys[0]
    // privKeyObj.decrypt(passphrase)

    const pubKeys: any = []
    for (const k of signer) {
      pubKeys.push(...openpgp.key.readArmored(k.keys.public).keys)
    }

    // console.log('data: ', data)
    // console.log('data2: ', data.toString('binary'))
    // window.g_encrDebug = data.toString('binary')
    // console.log('data2: ', data.toString('utf8'))
    // console.log('data2: ', data.toString())
    const options: any = {
      data: data, // input as String (or Uint8Array)
      // data: data.toString('binary'),
      // data: 'Hello World', // input as String (or Uint8Array)
      // publicKeys: openpgp.key.readArmored(signer.keys.public).keys,
      publicKeys: pubKeys,
      // privateKeys: privKeyObj, // for signing
      armor: false,
      // filename: 'somename.pdf'
    }
    if (filename != null) {
      options.filename = filename
    }

    // https://github.com/openpgpjs/openpgpjs/issues/204
    // const bin = data
    // let msg
    // msg = openpgp.message.fromBinary(bin)
    // msg = msg.encrypt(options.publicKeys)
    // // armored = openpgp.armor.encode(openpgp.enums.armor.message, msg.packets.write())

    // return msg.packets.write()

    return openpgp.encrypt(options).then(function(ciphertext) {
      // console.log('Done encrypting')
      // const cleartext = ciphertext.data
      const cleartext = ciphertext.message.packets.write()
      // const detachedSig = ciphertext.signature
      // console.log(ciphertext)
      // console.log(cleartext)
      // console.log(detachedSig)
      // return ciphertext
      return cleartext
    })
  }

  public async decrypt(data: any, signer: any): Promise<any> {
    // console.log('data: ', data)
    // const fileContentStr = data.toString('binary')
    // console.log('fileContentStr: ', fileContentStr)

    const passphrase = 'theseam'
    const privKeyObj = openpgp.key.readArmored(signer.keys.private).keys[0]
    privKeyObj.decrypt(passphrase)

    const options = {
      // message: openpgp.message.readArmored(data),     // parse armored message
      message: openpgp.message.read(data),
      // message: openpgp.message.fromBinary(data),

      // publicKeys: openpgp.key.readArmored(pubkey).keys,    // for verification (optional)
      privateKey: privKeyObj, // for decryption
      format: 'binary'
    }

    return openpgp.decrypt(options).then(function(plaintext) {
      console.log('Done decrypting')
      console.log(plaintext)
      // console.log(plaintext.data)

      // console.log('Done opening')

      return plaintext.data // 'Hello, World!'
      // return plaintext
    })
  }

}
