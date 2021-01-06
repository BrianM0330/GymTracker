import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
//Field decorator turns it into a GraphQL object field
//Column decorator turns it into a DB Column row

@ObjectType()
@Entity()
export class popData extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String, {nullable: true})
  @Column("text", { nullable: true })
  location: string;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_0: number;
  
  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_1: number;
  
  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_2: number;
  
  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_3: number;
  
  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_4: number;
  
  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_5: number;
  
  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_6: number;
  
  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_7: number;

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

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_17: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_18: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_19: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_20: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_21: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_22: number;

  @Field(() => Int, { nullable: true })
  @Column("int", { nullable: true })
  population_23: number;
}
