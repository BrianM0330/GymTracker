import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { GraphQLDate } from "graphql-iso-date";
//Field decorator turns it into a GraphQL object field
//Column decorator turns it into a DB Column row

@ObjectType()
@Entity()
export class popData extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => GraphQLDate)
  @Column("date", { nullable: true })
  population_date: Date;

  @Field(() => String)
  @Column("text", { nullable: true })
  location: string;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_8: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_9: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_10: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_11: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_12: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_13: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_14: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_15: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_16: number;
}
