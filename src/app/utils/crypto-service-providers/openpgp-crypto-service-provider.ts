import * as openpgp from 'openpgp'
import { ICryptoServiceProvider } from 'app/services/crypto.service'


export class OpenPGPCryptoServiceProvider implements ICryptoServiceProvider {

  constructor() {}

  public async generateKey(options: any): Promise<any> {
    return openpgp.generateKey(options).then((key) => {
        const privKey = key.privateKeyArmored // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
        const pubKey = key.publicKeyArmored   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
        // console.log(key)
        // console.log('privKey: ', privKey)
        // console.log('pubKey: ', pubKey)
        return {
          privateKey: privKey,
          publicKey: pubKey
        }
    })

  }

  public async sign(data: any, signer: any): Promise<any> {
    const passphrase = 'theseam'
    const privKeyObj = openpgp.key.readArmored(signer.keys.private).keys[0]
    privKeyObj.decrypt(passphrase)

    // console.log('data: ', data)
    // console.log('data2: ', data.toString('binary'))
    // console.log('data2: ', data.toString('utf8'))
    // console.log('data2: ', data.toString())
    const options = {
      // data: data, // input as String (or Uint8Array)
      data: data.toString('binary'),
      // data: 'Hello World', // input as String (or Uint8Array)
      privateKeys: privKeyObj, // for signing
      // detached: true
    }

    return openpgp.sign(options).then(function(signed) {
      // console.log('Done signing')
      const cleartext = signed.data
      // const detachedSig = signed.signature
      // console.log(signed)
      // console.log(cleartext)
      // console.log(detachedSig)
      return signed
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

  public async encrypt(data: any, privateKey: any): Promise<any> {

  }

  public async decrypt(data: any, publicKey: any): Promise<any> {

  }

}
