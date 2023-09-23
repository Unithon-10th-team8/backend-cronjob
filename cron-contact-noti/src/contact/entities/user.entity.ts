import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { ContactEntity } from './contact.entity';

// class User(TimestampBase):
//     __tablename__ = "user"

//     id: Mapped[int] = mapped_column(
//         primary_key=True, nullable=False, autoincrement=True
//     )
//     uid: Mapped[str] = mapped_column(sa.String(128), nullable=False, unique=True)
//     provider: Mapped[str] = mapped_column(sa.String(128), nullable=False)
//     name: Mapped[str] = mapped_column(sa.String(100), nullable=False)
//     email: Mapped[str] = mapped_column(
//         sa.Text, nullable=True, default=None
//     )  # 이메일이 null 이라면 필수로 받아야 함.

//     # relationship
//     contacts: Mapped[set[Contact]] = relationship(
//         back_populates="user", collection_class=set
//     )

//     @property
//     def profile(self) -> UserProfile:
//         return UserProfile(
//             id=self.id,
//             email=self.email,
//             created_at=self.created_at,
//             updated_at=self.updated_at,
//         )

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
