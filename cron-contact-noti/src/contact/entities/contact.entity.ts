import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from './user.entity';

@Table({
  tableName: 'contact',
  timestamps: false,
})
export class ContactEntity extends Model<ContactEntity> {
  @Column({
    primaryKey: true,
  })
  id: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: true,
  })
  organization: string;

  @Column({
    allowNull: true,
  })
  position: string;

  @Column({
    allowNull: true,
  })
  phone: string;

  @Column({
    allowNull: true,
  })
  email: string;

  @Column({
    allowNull: true,
  })
  category: string;

  @Column({
    allowNull: true,
  })
  profile_image_url: string;

  @Column({
    allowNull: true,
  })
  content: string;

  @Column({
    allowNull: false,
  })
  is_important: boolean;

  @Column({
    allowNull: true,
  })
  repeat_interval: string;

  @Column({
    allowNull: true,
  })
  repeat_base_date: Date;

  @ForeignKey(() => UserEntity)
  @Column({
    allowNull: false,
  })
  user_id: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;
}
