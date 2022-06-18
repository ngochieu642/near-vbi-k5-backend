const fs = require('fs');
const { publicEncrypt, privateDecrypt } = require('crypto');
const hash = require('object-hash');

interface LoadKeyResult {
  publicKey: string;
  privateKey: string;
}

export class Encryption {
  public static encryptData(data: string) {
    const { publicKey } = Encryption.loadKeys();

    const encryptedData: Buffer = publicEncrypt(publicKey, Buffer.from(data));
    return encryptedData.toString('hex');
  }

  public static decryptData(encryptedData: string) {
    const { privateKey } = Encryption.loadKeys();

    const decryptedData = privateDecrypt(privateKey, Buffer.from(encryptedData, 'hex'));
    return decryptedData.toString('utf-8');
  }

  public static getHashObject(object: any): string {
    return hash(object);
  }

  public static loadKeys(): LoadKeyResult {
    const publicKey = fs.readFileSync('pub1.pem', {
      encoding: 'utf8',
    });
    const privateKey = fs.readFileSync('.pvt1.pem', {
      encoding: 'utf8',
    });

    return { publicKey: publicKey, privateKey: privateKey };
  }
}
