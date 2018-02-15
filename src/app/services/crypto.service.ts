import { Injectable } from '@angular/core'
import * as kbpgp from 'kbpgp'
import { KBPGPCryptoServiceProvider } from 'app/utils/crypto-service-providers/kbpgp-crypto-service-provider'

export interface ICryptoSignature {
  data: any
}

export interface ICryptoServiceProvider {
  // sign: (data: any, privateKey: any) => Promise<ICryptoSignature>
  sign: (data: any, privateKey: any) => any
  verify: (data: any, publicKey: any) => any
  encrypt: (data: any, privateKey: any) => any
  decrypt: (data: any, publicKey: any) => any
}

@Injectable()
export class CryptoService {

  public cryptoProvider: ICryptoServiceProvider = new KBPGPCryptoServiceProvider()

  constructor() { }



}
