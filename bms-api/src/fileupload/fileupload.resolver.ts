import { Injectable } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FileUploadService } from './fileupload.service';
import { File } from './dto/file';
import { GraphQLUpload, FileUpload } from 'graphql-upload-ts';

@Injectable()
@Resolver(() => File)
export class FileUploadResolver {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Mutation(() => File, { nullable: true })
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<File | null> {
    if (!file) {
      return null;
    }
    try {
      const { filename, url } = await this.fileUploadService.uploadFile(file);
      return { filename, url };
    } catch (error) {
      throw new Error('Error uploading file');
    }
  }
}
