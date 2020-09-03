import {Resolver, Mutation, Arg, Query, Int} from "type-graphql"
import { popData } from "../entity/popEntity";
import inputUpdateFields from './inputUpdateFields'

@Resolver()
export class popDataResolver {
    today = new Date()

    @Mutation(() => Boolean)
    async createEntry() {
        const population_date = this.today
        await popData.insert({population_date})
        return true
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