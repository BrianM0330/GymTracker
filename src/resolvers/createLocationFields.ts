import {InputType, Field} from 'type-graphql'

@InputType()
export class CreateLocationInput {
    @Field(() => String, {nullable: true})
    location: string
}