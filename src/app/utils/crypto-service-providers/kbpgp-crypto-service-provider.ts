// import * as kbpgp from 'kbpgp'
import { ICryptoServiceProvider } from 'app/services/crypto.service'
declare const kbpgp: any

export class KBPGPCryptoServiceProvider implements ICryptoServiceProvider {

  constructor() {}

  public async generateKey(options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      // console.log('generate_rsa')
      kbpgp.KeyManager.generate_rsa(options, (err, charlie) => {
        // console.log('charlie: ', charlie)
        charlie.sign({}, function(err2) {
          // console.log('done!')

          let privateKey
          let publicKey

          charlie.export_pgp_private ({
            passphrase: 'theseam'
          }, (err3, pgp_private) => {
            // console.log('private key: ', pgp_private)
            privateKey = pgp_private
          })

          charlie.export_pgp_public({}, function(err3, pgp_public) {
            // console.log('public key: ', pgp_public)
            publicKey = pgp_public
          })

          resolve({
            privateKey: privateKey,
            publicKey: publicKey
          })
        })
      })

      // console.log('generate')
      // kbpgp.KeyManager.generate(options, (err, charlie) => {
      //   console.log('charlie: ', charlie)

      //   charlie.export_pgp_private ({
      //     passphrase: 'theseam'
      //   }, (err2, pgp_private) => {
      //     console.log('private key: ', pgp_private)
      //   })

      //   charlie.export_pgp_public({}, function(err2, pgp_public) {
      //     console.log('public key: ', pgp_public)
      //   })

      //   console.log('Done')

      //   resolve()
      // })
    })
  }

  public async sign(data: any, signer: any): Promise<any> {
    let alice

    const alice_pgp_key = signer.keys.private
    const alice_passphrase = 'theseam'

    kbpgp.KeyManager.import_from_armored_pgp({
      armored: alice_pgp_key
    }, function(err, aliceRes) {
      if (!err) {
        if (aliceRes.is_pgp_locked()) {
          aliceRes.unlock_pgp({
            passphrase: alice_passphrase
          }, function(err2) {
            if (!err2) {
              console.log('Loaded private key with passphrase')
              alice = aliceRes
            }
          })
        } else {
          console.log('Loaded private key w/o passphrase')
          alice = aliceRes
        }
      }
    })

    const params = {
      msg: 'Here is my manifesto',
      sign_with: alice
    }

    return new Promise((resolve, reject) => {
      kbpgp.box (params, function(err, result_string, result_buffer) {
        console.log('Signed')
        console.log(err, result_string, result_buffer)
        resolve({
          signatureString: result_string,
          signatureBuffer: result_buffer,
          data: result_buffer // Only here for compatability with previous OpenPGP response
        })
      })
    })
  }

  public async verify(data: any, signer: any): Promise<any> {

  }

  public async encrypt(data: any, privateKey: any): Promise<any> {

  }

  public async decrypt(data: any, publicKey: any): Promise<any> {

  }

}
