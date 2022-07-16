import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"



class BracketsService {
    async getAccountTickets(id) {
        const brackets = await dbContext.Brackets.find({ creatorId: id })
            .populate('competition')
        return brackets
    }
    async getById(id) {
        let bracket = await dbContext.Brackets.findById(id)
        if(!bracket){
            throw new BadRequest('A bracket with that Id was not found')
        }
        return bracket
    }
    async create(body) {
        let bracket = await dbContext.Brackets.create(body)
        return bracket
    }
    async deleteBracket(id) {
        const bracket = await this.getById(id)
        await bracket.remove()
        return bracket
    }
    async getCompetitionBrackets(competitionId) {
        const brackets = await dbContext.Brackets.find({ competitionId: competitionId })
            .populate('competition')
        return brackets
    }

}

export const bracketsService = new BracketsService()