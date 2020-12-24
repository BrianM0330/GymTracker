import {Resolver, Mutation, Arg, Query, Int} from "type-graphql"
import { popData } from "../entity/popEntity";
import { CreateLocationInput } from "./createLocationFields";
import inputUpdateFields from './inputUpdateFields'

@Resolver()
export class popDataResolver {
//https://codetain.com/blog/implementing-server-side-crud-with-typescript-typeorm-and-graphql
    @Mutation(() => popData)
    async createEntry(@Arg("data")data: CreateLocationInput ) {
        const test = popData.create(data)
        await test.save()
        return popData
    }

    @Mutation(() => Boolean)
    async updateEntry(
    @Arg('id' ) id: number,
    @Arg('input', () => inputUpdateFields) input: inputUpdateFields
    ) {
        await popData.update({id}, input)
        return true
    }

    @Mutation(() => Boolean)
    async deleteEntry(
        @Arg('id', () => Int) id:number
    ) {
        await popData.delete({id})
        return true
    }

    @Query(() => [popData])
    popHistory() {
        return popData.find()
    }
}