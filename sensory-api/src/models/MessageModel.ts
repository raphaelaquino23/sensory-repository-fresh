import { Table, Column, Model, PrimaryKey, HasOne, CreatedAt, UpdatedAt, NotNull, ForeignKey, BelongsTo, AutoIncrement, AllowNull, NotEmpty, Unique } from 'sequelize-typescript';
import { User } from './UserModel';
//COMPLETE
//Model of Message

//Message
@Table({ createdAt: false, updatedAt: false})
export class Message extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  Message_Id: number;

  @Column
  Message_Content: string;

  @Column
  Sender_Id: number;

  @Column
  Receiver_Id: number;

  @Column
  Message_DateCreated: Date;
}
