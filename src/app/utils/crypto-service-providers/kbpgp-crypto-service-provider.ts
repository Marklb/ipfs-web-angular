import { ICryptoServiceProvider } from 'app/services/crypto.service'


export class KBPGPCryptoServiceProvider implements ICryptoServiceProvider {

  constructor() {}

  public async sign(data: any, privateKey: any): Promise<any> {

  }

  public async verify(data: any, publicKey: any): Promise<any> {

  }

  public async encrypt(data: any, privateKey: any): Promise<any> {

  }

  public async decrypt(data: any, publicKey: any): Promise<any> {

  }

}
