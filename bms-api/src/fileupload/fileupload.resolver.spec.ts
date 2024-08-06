import { Test, TestingModule } from '@nestjs/testing';
import { FileuploadResolver } from './fileupload.resolver';

describe('FileuploadResolver', () => {
  let resolver: FileuploadResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileuploadResolver],
    }).compile();

    resolver = module.get<FileuploadResolver>(FileuploadResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
