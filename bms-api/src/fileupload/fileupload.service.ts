import { Injectable, Inject } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { FileUpload } from '../graphql';

@Injectable()
export class FileUploadService {
  constructor(
    @Inject(FirebaseService) private firebaseService: FirebaseService,
  ) {}

  async uploadFile(
    file: FileUpload,
  ): Promise<{ filename: string; url: string }> {
    try {
      const { createReadStream, filename, mimetype } = await file;
      const bucket = this.firebaseService.getStorageInstance().bucket();

      const randomName = uuidv4();
      const extension = path.extname(filename);
      const newFilename = `${randomName}${extension}`;

      const fileUpload = bucket.file(`uploads/${newFilename}`);

      const stream = createReadStream();
      const writeStream = fileUpload.createWriteStream({
        metadata: {
          contentType: mimetype,
        },
      });

      await new Promise((resolve, reject) => {
        stream.pipe(writeStream).on('error', reject).on('finish', resolve);
      });

      // Generate a signed URL
      const [url] = await fileUpload.getSignedUrl({
        action: 'read',
        expires: '03-01-2500', // Set expiration date
      });

      return { filename: newFilename, url };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Error uploading file');
    }
  }
}
