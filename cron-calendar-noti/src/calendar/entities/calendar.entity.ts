import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ContactEntity } from 'src/contact/entities/contact.entity';

@Table({
  tableName: 'calendar',
  timestamps: false,
})
export class CalendarEntity extends Model<CalendarEntity> {
  @Column({
    primaryKey: true,
  })
  id: string;

  @Column({
    allowNull: false,
  })
  name: string;

  @Column({
    allowNull: false,
  })
  start_dt: Date;

  @Column({
    allowNull: true,
  })
  end_dt: Date;

  @Column({
    allowNull: true,
  })
  is_all_day: boolean;

  @Column({
    allowNull: true,
  })
  remind_interval: number;

  @Column({
    allowNull: false,
  })
  is_important: boolean;

  @Column({
    allowNull: true,
  })
  content: string;

  @Column({
    allowNull: false,
  })
  is_complete: boolean;

  @Column({
    allowNull: true,
  })
  completed_at: Date;

  @Column({
    allowNull: false,
  })
  is_repeat: boolean;

  @Column({
    allowNull: true,
    type: DataType.ARRAY(DataType.STRING),
  })
  tags: string[];

  @Column({
    allowNull: true,
  })
  calendar_recurring_id: string;

  // relationship
  @ForeignKey(() => ContactEntity)
  @Column({
    allowNull: false,
  })
  contact_id: string;

  @BelongsTo(() => ContactEntity)
  contact: ContactEntity;
}
