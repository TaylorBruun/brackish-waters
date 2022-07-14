import { dbContext } from "../db/DbContext"



class BracketsService {
    async getAccountTickets(id) {
        const brackets = await dbContext.Brackets.find({ creatorId: id })
            .populate('competition')
        return brackets
    }
    async getById(id) {
        let bracket = await dbContext.Brackets.findById(id)
        return bracket
    }
    async create(body) {
        let bracket = await dbContext.Brackets.create(body)
        return bracket
    }
    async deleteBracket(body) {
        const bracket = await dbContext.Brackets.findById(body.id)
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