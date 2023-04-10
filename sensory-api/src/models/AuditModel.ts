import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from "sequelize-typescript";

@Table({ createdAt: false, updatedAt: false })
export class AuditTrail extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column({
    type: DataType.STRING(30),
  })
  actor: string;

  @Column({
    type: DataType.STRING(200),
  })
  action: string;

  @Column({
    type: DataType.STRING(15),
  })
  type: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  time_performed: Date;
}
