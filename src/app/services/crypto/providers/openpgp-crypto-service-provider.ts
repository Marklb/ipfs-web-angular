import * as openpgp from 'openpgp'
import { Buffer as _Buffer } from 'buffer/'
import { ICryptoServiceProvider, ICryptoKeysPair } from '../crypto.models'

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

  public async sign(data: any, privateKey: string, keyPassphrase: string = null): Promise<string> {
    const privKeyObj = openpgp.key.readArmored(privateKey).keys[0]
    // console.log(privKeyObj.primaryKey.isDecrypted)
    if (keyPassphrase) {
      privKeyObj.decrypt(keyPassphrase)
    }

    const options = {
      data: data,
      privateKeys: privKeyObj,
      detached: true
    }

    return openpgp.sign(options).then((signed) => {
      const detachedSig = signed.signature
      return detachedSig
    })
  }

  public async verify(message: any, publicKey: string, signature: any): Promise<boolean> {
    const options = {
      message: openpgp.message.fromBinary(message),
      signature: openpgp.signature.readArmored(signature),
      publicKeys: openpgp.key.readArmored(publicKey).keys
    }

    return openpgp.verify(options).then(function(verified) {
      const validity = verified.signatures[0].valid
      return validity
    })
  }

  public async encrypt(data: any, publicKeys: string[], filename: string = null): Promise<string> {
    const pubKeys: any = []
    for (const k of publicKeys) {
      pubKeys.push(...openpgp.key.readArmored(k).keys)
    }

    const options: any = {
      data: data,
      publicKeys: pubKeys,
      armor: false
    }
    if (filename != null) {
      options.filename = filename
    }

    return openpgp.encrypt(options).then(function(ciphertext) {
      const cyphertextStr = ciphertext.message.packets.write()
      return cyphertextStr
    })
  }

  public async decrypt(data: any, privateKey: string, keyPassphrase: string): Promise<Uint8Array> {
    const privKeyObj = openpgp.key.readArmored(privateKey).keys[0]
    privKeyObj.decrypt(keyPassphrase)

    const options = {
      message: openpgp.message.read(data),
      privateKey: privKeyObj,
      format: 'binary'
    }

    return openpgp.decrypt(options).then((plaintext) => {
      return plaintext.data
    })
  }

}
