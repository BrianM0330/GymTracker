import {Int, InputType, Field} from "type-graphql"

//These fields are used for the update query
@InputType()
export default class popInput {
  @Field(() => Int, {nullable: true})
  population_8: number;

  @Field(() => Int, {nullable: true})
  population_9: number;

  @Field(() => Int, {nullable: true})
  population_10: number;

  @Field(() => Int, {nullable: true})
  population_11: number;

  @Field(() => Int, {nullable: true})
  population_12: number;

  @Field(() => Int, {nullable: true})
  population_13: number;

  @Field(() => Int, {nullable: true})
  population_14: number;

  @Field(() => Int, {nullable: true})
  population_15: number;

  @Field(() => Int, {nullable: true})
  population_16: number;
}
