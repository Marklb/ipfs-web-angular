import { Injectable } from '@angular/core'
import { OpenPGPCryptoServiceProvider } from 'app/utils/crypto-service-providers/openpgp-crypto-service-provider'
import { KBPGPCryptoServiceProvider } from 'app/utils/crypto-service-providers/kbpgp-crypto-service-provider'

export interface ICryptoSignature {
  data: any
}

// sign: (data: any, privateKey: any) => Promise<ICryptoSignature>
export interface ICryptoServiceProvider {
  generateKey: (options: any) => any
  sign: (data: any, signer: any) => any
  verify: (data: any, signer: any) => any
  encrypt: (data: any, signer: any) => any
  decrypt: (data: any, signer: any) => any
}

@Injectable()
export class CryptoService {

  public _cryptoProvider: ICryptoServiceProvider = new OpenPGPCryptoServiceProvider()
  // public _cryptoProvider: ICryptoServiceProvider = new KBPGPCryptoServiceProvider()

  constructor() { }

  public async generateKey(options: any): Promise<any> {
    return this._cryptoProvider.generateKey(options)
  }

  public async sign(data: any, signer: any): Promise<any> {
    return this._cryptoProvider.sign(data, signer)
  }

  public async verify(data: any, signer: any): Promise<any> {
    return this._cryptoProvider.verify(data, signer)
  }

  public async encrypt(data: any, signer: any): Promise<any> {
    return this._cryptoProvider.verify(data, signer)
  }

  public async decrypt(data: any, signer: any): Promise<any> {
    return this._cryptoProvider.verify(data, signer)
  }

}
