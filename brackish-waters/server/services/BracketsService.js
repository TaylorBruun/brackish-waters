import { dbContext } from "../db/DbContext"



class BracketsService{
    async getCompetitionBrackets(competitionId) {
       const brackets = await dbContext.Brackets.find({competitionId: competitionId}) 
       .populate('competition')
       return brackets
    }

}

export const bracketsService = new BracketsService()