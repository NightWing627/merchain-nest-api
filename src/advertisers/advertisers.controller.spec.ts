import { Test, TestingModule } from '@nestjs/testing';
import { AdvertisersController } from './advertisers.controller';

describe('Advertisers Controller', () => {
  let controller: AdvertisersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvertisersController],
    }).compile();

    controller = module.get<AdvertisersController>(AdvertisersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
