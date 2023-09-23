import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContactEntity } from './entities/contact.entity';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([ContactEntity, UserEntity])],
  providers: [ContactService],
  exports: [ContactService],
})
export class ContactModule {}
