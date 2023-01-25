import { Table, Column, Model, PrimaryKey, HasOne, CreatedAt, UpdatedAt, NotNull, ForeignKey, BelongsTo, AutoIncrement, AllowNull, NotEmpty, Unique } from 'sequelize-typescript';
import { User } from './UserModel';
//COMPLETE
//Model for AwarenessTest, AwarenessTestResult, AwarenessTestStats,and AwarenessTestType

//AwarenessTest
@Table({ createdAt: false, updatedAt: false})
export class AwarenessTest extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  get Test_Id(): number{
    return this.getDataValue('Test_Id');
  }
  //Test_Id: number;

  @Column
  Test_Name: string;

  @Column
  Test_Content: string;

  @Column
  TestType_Id: number;
  
  @ForeignKey(() => AwarenessTestStats)
  @Column
  set TestStats_Id(value: number) {
    this.setDataValue('TestStats_Id', value);
  }
  //TestStats_Id: number;
}

//AwarenessTestResults
@Table({ createdAt: false, updatedAt: false})
export class AwarenessTestResult extends Model{
  @AutoIncrement
  @PrimaryKey
  @Column
  TestResult_Id: number

  @ForeignKey(() => AwarenessTest)
  @Column
  set Test_Id(value: number) {
    this.setDataValue('Test_Id', value);
  }
  //Test_Id: number
  
  @ForeignKey(() => User)
  @Column
  User_Id: number

  @Column
  TestResult_Description: string
  
  @Column
  TestResult_Maximum: number

  @Column
  TestResult_Score: number

  @Column
  TestResult_Feedback: string
  
}

//AwarenessTestStats
@Table({ createdAt: false, updatedAt: false})
export class AwarenessTestStats extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  get TestStats_Id(): number{
    return this.getDataValue('TestStats_Id');
  }
  //TestStats_Id: number;

  @Column
  TestStats_TakersTotal: number;

  @Column
  TestStats_AverageResults: number;

}

//AwarenessTestType
@Table({ createdAt: false, updatedAt: false})
export class AwarenessTestType extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  TestType_Id: number;

  @Column
  TestType_Name: string;

  @Column
  TestType_Description: string;
}

