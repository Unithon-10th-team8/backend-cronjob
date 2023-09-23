import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContactEntity } from './entities/contact.entity';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import * as dayjs from 'dayjs';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(ContactEntity)
    private readonly contactModel: typeof ContactEntity,
    @InjectModel(UserEntity)
    private readonly userModel: typeof UserEntity,
    private sequelize: Sequelize,
  ) {
    sequelize.addModels([ContactEntity, UserEntity]);
  }

  async getRepeatNotis(): Promise<ContactEntity[][]> {
    const todayDay = dayjs().format('DD');

    const contacts = await this.contactModel.findAll({
      where: {
        [Op.and]: [
          this.sequelize.where(
            this.sequelize.fn(
              'TO_CHAR',
              this.sequelize.col('repeat_base_date'),
              'DD',
            ),
            todayDay,
          ),
        ],
      },
      include: [
        {
          model: UserEntity,
          attributes: [
            'name',
            'email',
            // ['name', 'user_name'],
            // ['email', 'user_email'],
            // ['name', 'user_name'],
            // ['email', 'user_email'],
          ],
        },
      ],
    });

    const userSet = new Set();
    contacts.forEach((contact) => {
      userSet.add(contact.user_id);
    });

    const userArr = Array.from(userSet);
    const resultArr = [];

    // group by user_id
    userArr.forEach((user_id) => {
      const userContacts = contacts.filter(
        (contact) => contact.user_id === user_id,
      );
      const userContactArr = [];
      userContacts.forEach((contact) => {
        userContactArr.push(contact);
      });

      resultArr.push(userContactArr);
    });

    return resultArr;
  }
}
