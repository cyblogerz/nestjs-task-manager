import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    //hash the password

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userEntityRepository.create({
      username,
      password: hashedPassword,
    });
    try {
      await this.userEntityRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        //duplicate user
        throw new ConflictException('User name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async checkUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { username } = authCredentialsDto;
    const user = await this.userEntityRepository.findOne({
      where: { username },
    });
    return user;
  }
}
