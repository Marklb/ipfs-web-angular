import { Injectable } from '@angular/core'
import { ICryptoServiceProvider, ICryptoKeysPair } from './crypto.models'
import { OpenPGPCryptoServiceProvider } from './providers/openpgp-crypto-service-provider'
import { KBPGPCryptoServiceProvider } from './providers/kbpgp-crypto-service-provider'
import { MixedCryptoServiceProvider } from './providers/mixed-crypto-service-provider'

@Injectable()
export class CryptoService {

  /**
   * Provides the implementation details for the CryptoService functions
   *
   * The reason for this is to allow the service to easily switch encryption
   * implementations without changing the components using encryption
   */
  public _cryptoProvider: ICryptoServiceProvider = new MixedCryptoServiceProvider()

  /**
   * Generate OpenPGP Key
   *
   * @param options
   */
  public async generateKey(options: any): Promise<ICryptoKeysPair> {
    return this._cryptoProvider.generateKey(options)
  }

  /**
   * Sign data
   *
   * @param data
   * @param privateKey
   * @param keyPassphrase (optional) Required if private key is secured with a passphrase
   */
  public async sign(data: any, privateKey: string, keyPassphrase: string = null): Promise<string> {
    return this._cryptoProvider.sign(data, privateKey, keyPassphrase)
  }

  /**
   * Verify message
   *
   * @param message
   * @param publicKey
   * @param signature
   */
  public async verify(message: any, publicKey: string, signature: any): Promise<boolean> {
    return this._cryptoProvider.verify(message, publicKey, signature)
  }

  /**
   * Encrypt data
   *
   * @param data
   * @param publicKeys
   * @param filename (optional) Will be included in the OpenPGP filename field if provided
   */
  public async encrypt(data: any, publicKeys: string[], filename: string = null): Promise<string> {
    return this._cryptoProvider.encrypt(data, publicKeys, filename)
  }

  /**
   *
   * @param data
   * @param privateKey
   * @param keyPassphrase (optional) Required if private key is secured with a passphrase
   */
  public async decrypt(data: any, privateKey: string, keyPassphrase: string = null): Promise<Uint8Array> {
    return this._cryptoProvider.decrypt(data, privateKey, keyPassphrase)
  }

}
