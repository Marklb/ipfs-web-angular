import { Injectable } from '@angular/core'
import { OpenPGPCryptoServiceProvider } from 'app/utils/crypto-service-providers/openpgp-crypto-service-provider'
import { KBPGPCryptoServiceProvider } from 'app/utils/crypto-service-providers/kbpgp-crypto-service-provider'

export interface ICryptoSignature {
  // The armored signature
  // Example:
  // -----BEGIN PGP SIGNATURE-----
  // Version: OpenPGP.js v2.6.2
  // Comment: https://openpgpjs.org
  //
  // wsFcBAABCAAQBQJalkPcCRC739vf130X9AAAzSIP/3inkZ2bZYwkZEAhGIvh
  // ...
  // ...
  // =3koB
  // -----END PGP SIGNATURE-----
  signature: any
}

export interface ICryptoKeysPair {
  privateKey: string
  publicKey: string
}

export interface ICryptoServiceProvider {
  generateKey: (options: any) => Promise<ICryptoKeysPair>
  sign: (data: any, signer: any) => Promise<ICryptoSignature>
  verify: (data: any, signer: any) => Promise<any>
  encrypt: (data: any, signer: any, filename: string) => Promise<any>
  decrypt: (data: any, signer: any) => Promise<any>
}

@Injectable()
export class CryptoService {

  public _cryptoProvider: ICryptoServiceProvider = new OpenPGPCryptoServiceProvider()
  // public _cryptoProvider: ICryptoServiceProvider = new KBPGPCryptoServiceProvider()

  constructor() { }

  public async generateKey(options: any): Promise<ICryptoKeysPair> {
    // TODO: Implement a nice way of allowing multiple providers or pick one
    const _tmpProvider: ICryptoServiceProvider = new KBPGPCryptoServiceProvider()
    return _tmpProvider.generateKey(options)
  }

  public async sign(data: any, signer: any): Promise<ICryptoSignature> {
    return this._cryptoProvider.sign(data, signer)
  }

  public async verify(data: any, signer: any): Promise<any> {
    // return this._cryptoProvider.verify(data, signer)
    const tmp = await this._cryptoProvider.verify(data, signer)
    console.log('tmp: ', tmp)
    return tmp
  }

  public async encrypt(data: any, signer: any, filename: string = null): Promise<any> {
    return this._cryptoProvider.encrypt(data, signer, filename)
  }

  public async decrypt(data: any, signer: any): Promise<any> {
    return this._cryptoProvider.decrypt(data, signer)
  }

}
