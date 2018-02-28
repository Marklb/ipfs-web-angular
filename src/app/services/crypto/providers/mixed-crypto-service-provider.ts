import { ICryptoServiceProvider, ICryptoKeysPair } from '../crypto.models'
import { OpenPGPCryptoServiceProvider } from './openpgp-crypto-service-provider'
import { KBPGPCryptoServiceProvider } from './kbpgp-crypto-service-provider'

export class MixedCryptoServiceProvider implements ICryptoServiceProvider {

  public _openPgpProvider: ICryptoServiceProvider = new OpenPGPCryptoServiceProvider()
  public _kbpgpProvider: ICryptoServiceProvider = new KBPGPCryptoServiceProvider()

  public async generateKey(options: any): Promise<ICryptoKeysPair> {
    return this._kbpgpProvider.generateKey(options)
  }

  public async sign(data: any, privateKey: string, keyPassphrase: string = null): Promise<string> {
    return this._openPgpProvider.sign(data, privateKey, keyPassphrase)
  }

  public async verify(message: any, publicKey: string, signature: any): Promise<boolean> {
    return this._openPgpProvider.verify(message, publicKey, signature)
  }

  public async encrypt(data: any, publicKeys: string[], filename: string = null): Promise<string> {
    return this._openPgpProvider.encrypt(data, publicKeys, filename)
  }

  public async decrypt(data: any, privateKey: string, keyPassphrase: string): Promise<Uint8Array> {
    return this._openPgpProvider.decrypt(data, privateKey, keyPassphrase)
  }

}
