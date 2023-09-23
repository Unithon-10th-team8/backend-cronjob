import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { ContactEntity } from './contact.entity';

@Table({
  tableName: 'user',
  timestamps: false,
})
export class UserEntity extends Model<UserEntity> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    allowNull: false,
  })
  uid: string;

  @Column({
    allowNull: false,
  })
  provider: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: true,
  })
  email: string;

  @HasMany(() => ContactEntity)
  contacts: ContactEntity[];
}
