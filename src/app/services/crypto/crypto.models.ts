// export interface ICryptoSignature {
//   // The armored signature
//   // Example:
//   // -----BEGIN PGP SIGNATURE-----
//   // Version: OpenPGP.js v2.6.2
//   // Comment: https://openpgpjs.org
//   //
//   // wsFcBAABCAAQBQJalkPcCRC739vf130X9AAAzSIP/3inkZ2bZYwkZEAhGIvh
//   // ...
//   // ...
//   // =3koB
//   // -----END PGP SIGNATURE-----
//   signature: any
// }

export interface ICryptoKeysPair {
  privateKey: string
  publicKey: string
}



export interface ICryptoServiceProvider {
  generateKey: (options: any) => Promise<ICryptoKeysPair>
  sign: (data: any, privateKey: string, keyPassphrase: string) => Promise<string>
  verify: (message: any, publicKey: string, signature: any) => Promise<boolean>
  encrypt: (data: any, publicKeys: string[], filename: string) => Promise<string>
  decrypt: (data: any, privateKey: string, keyPassphrase: string) => Promise<Uint8Array>
}
