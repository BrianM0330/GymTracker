import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class popData {
  @PrimaryGeneratedColumn()
    Date!: Date;

  @Column()
    time_8!: string;
  @Column()
    time_9!: string;
  @Column()
    time_10!: string;
  @Column()
    time_11!: string;
  @Column()
    time_12!: string;
  @Column()
    time_13!: string;
  @Column()
    time_14!: string;
  @Column()
    time_15!: string;
  @Column()
    time_16!: string;
}
