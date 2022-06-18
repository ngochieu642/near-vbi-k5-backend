import { constants } from 'crypto';

const fs = require('fs');
const { publicEncrypt, privateDecrypt } = require('crypto');
const hash = require('object-hash');

interface LoadKeyResult {
  publicKey: string;
  privateKey: string;
}

export class EncryptionService {
  public static encryptData(data: string) {
    const { publicKey } = EncryptionService.loadKeys();
    const buffer = Buffer.from(data, 'utf-8');

    console.log(Buffer.byteLength(buffer) + ' bytes');

    const encryptedData: Buffer = publicEncrypt({ key: publicKey }, buffer);
    return encryptedData.toString('hex');
  }

  public static decryptData(encryptedData: string) {
    const { privateKey } = EncryptionService.loadKeys();

    const decryptedData = privateDecrypt({
      key: privateKey,
      buffer: Buffer.from(encryptedData, 'hex'),
      padding: constants.RSA_NO_PADDING,
    });
    return decryptedData.toString('utf-8');
  }

  public static getHashObject(object: any): string {
    return hash(object);
  }

  public static loadKeys(): LoadKeyResult {
    const publicKey = fs.readFileSync(`./src/shared/encryption/pub1.pem`, {
      encoding: 'utf8',
    });
    const privateKey = fs.readFileSync(`./src/shared/encryption/pvt1.pem`, {
      encoding: 'utf8',
    });

    return { publicKey: publicKey, privateKey: privateKey };
  }
}
