import {Resolver, Mutation, Arg, Query} from "type-graphql"
import { popData } from "../entity/popEntity";
import inputUpdateFields from './inputUpdateFields'

@Resolver()
export class popDataResolver {
    today = new Date()

    @Mutation( () => Boolean)
    async addDate() {
        const population_date = this.today
        await popData.insert({population_date})
        return true
    }

    @Mutation(() => Boolean)
    async createEntry8(
        @Arg("population_8") population_8: number
        ) {
        await popData.insert({population_8})
        console.log(population_8)
        return true;
    }

    @Mutation(() => Boolean)
    async createEntry9(
        @Arg("population_9") population_9: number
        ) {
        await popData.insert({population_9})
        console.log(population_9)
        return true;
    }
    
    @Mutation(() => Boolean)
    async createEntry10(
        @Arg("population_10") population_10: number
        ) {
        await popData.insert({population_10})
        console.log(population_10)
        return true;
    }

    @Mutation(() => Boolean)
    async createEntry11(
        @Arg("population_11") population_11: number
        ) {
        await popData.insert({population_11})
        console.log(population_11)
        return true;
    }

    @Mutation(() => Boolean)
    async createEntry12(
        @Arg("population_12") population_12: number
        ) {
        await popData.insert({population_12})
        console.log(population_12)
        return true;
    }

    @Mutation(() => Boolean)
    async createEntry13(
        @Arg("population_13") population_13: number
        ) {
        await popData.insert({population_13})
        console.log(population_13)
        return true;
    }

    @Mutation(() => Boolean)
    async createEntry14(
        @Arg("population_14") population_14: number
        ) {
        await popData.insert({population_14})
        console.log(population_14)
        return true;
    }

    @Mutation(() => Boolean)
    async createEntry15(
        @Arg("population_15") population_15: number
        ) {
        await popData.insert({population_15})
        console.log(population_15)
        return true;
    }

    @Mutation(() => Boolean)
    async createEntry16(
        @Arg("population_16") population_16: number
        ) {
        await popData.insert({population_16})
        console.log(population_16)
        return true;
    }

    @Mutation(() => Boolean)
    async updateEntry(
    @Arg('id' ) id: number,
    @Arg('input', () => inputUpdateFields) input: inputUpdateFields
    ) {
        await popData.update({id}, input)
        return true
    }

    @Query(() => [popData])
    populationHistory() {
        return popData.find()
    }
}