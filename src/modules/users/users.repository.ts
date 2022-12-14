import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelName } from './schemas/user.schema';
import { UserModel } from './users.model';
import { BaseRepository } from 'src/base/base.repository';

@Injectable()
export class UsersRepository extends BaseRepository<UserModel> {
  constructor(@InjectModel(ModelName) model) {
    super(model);
  }
}
