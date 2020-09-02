import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class popData {
  @PrimaryGeneratedColumn()
    Date!: Date;

  @Column('int')
    time_8!: Number;
  @Column('int')
    time_9!: Number;
  @Column('int')
    time_10!: Number;
  @Column('int')
    time_11!: Number;
  @Column('int')
    time_12!: Number;
  @Column('int')
    time_13!: Number;
  @Column('int')
    time_14!: Number;
  @Column('int')
    time_15!: Number;
  @Column('int')
    time_16!: Number;
}
