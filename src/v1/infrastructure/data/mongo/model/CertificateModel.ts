import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MongoConfig } from '../MongoConfig';

export type CertificateDocument = CertificateModel & Document;

/**
 * This class must be keep update-to-date with CertificateEntity
 */
@Schema({ collection: MongoConfig.getCertificatesCollectionName() })
export class CertificateModel {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop()
  certificateId: string;

  @Prop()
  rootCertificate: string;

  @Prop()
  claimCertificate: string;

  @Prop()
  secureKey: string;

  @Prop()
  isValid: boolean;

  @Prop()
  ownershipToken: string;
}

export const CertificateSchema = SchemaFactory.createForClass(CertificateModel);
