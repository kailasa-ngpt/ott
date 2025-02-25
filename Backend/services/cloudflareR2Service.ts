import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const {
  R2_ACCESS_KEY_ID,
  R2_SECRET_ACCESS_KEY,
  R2_BUCKET_NAME,
  R2_ACCOUNT_ID,
  R2_REGION,
} = process.env;

const s3 = new AWS.S3({
  endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: R2_ACCESS_KEY_ID,
  secretAccessKey: R2_SECRET_ACCESS_KEY,
  region: R2_REGION,
  signatureVersion: 'v4',
});

export const uploadFile = async (key: string, body: Buffer | Uint8Array | Blob | string) => {
  const params = {
    Bucket: R2_BUCKET_NAME!,
    Key: key,
    Body: body,
  };

  try {
    const data = await s3.upload(params).promise();
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const getFile = async (key: string) => {
  const params = {
    Bucket: R2_BUCKET_NAME!,
    Key: key,
  };

  try {
    const data = await s3.getObject(params).promise();
    return data.Body;
  } catch (error) {
    console.error('Error getting file:', error);
    throw error;
  }
};