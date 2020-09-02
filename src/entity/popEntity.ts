import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import {GraphQLDate} from 'graphql-iso-date'
//Field decorator turns it into a GraphQL object field
//Column decorator turns it into a DB Column row

@ObjectType()
@Entity()
export class popData extends BaseEntity{

  @Field(() => Int)
  @PrimaryGeneratedColumn()
    id!: number;
  
  @Field(() => GraphQLDate)
  @Column('date', {nullable:true})
    population_date: Date;

  @Field(() => Int)
  @Column('int', {nullable:true})
    population_8: number;

  @Column('int', {nullable:true})
    population_9: number;

  @Column('int', {nullable:true})
    population_10: number;

  @Column('int', {nullable:true})
    population_11: number;

  @Column('int', {nullable:true})
    population_12: number;

  @Column('int', {nullable:true})
    population_13: number;

  @Column('int', {nullable:true})
    population_14: number;

  @Column('int', {nullable:true})
    population_15: number;

  @Column('int', {nullable:true})
    population_16: number;
}
