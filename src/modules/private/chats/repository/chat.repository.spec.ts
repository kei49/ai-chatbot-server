import { Test, TestingModule } from '@nestjs/testing';
import { ChatRepository } from './chat.repository';

describe('Repository', () => {
  let provider: ChatRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRepository],
    }).compile();

    provider = module.get<ChatRepository>(ChatRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
