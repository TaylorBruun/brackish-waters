import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"



class MatchesService{

    
    async create(body) {
        let match = await dbContext.Matches.create(body)
        await match.populate('bracket')
        await match.populate('matchTeams')
        return match
    }

    // NOTE this is what normal users use to "create" their prediction. The prediction will be prepopulated with placeholder matches so that slots, etc can be defined by the Admin
    async updateMatch(body) {
        let match = await dbContext.Matches.findById(body.id)
        
    }
    async deleteMatch(id) {
        let match = await dbContext.Matches.findById(id)
        if(!match){
            throw new BadRequest('A match with that Id was not found')
        }
        await match.remove()
        return match
    }
    async getBracketMatches(bracketId) {
        const matches = await dbContext.Matches.find({bracketId: bracketId})
        .populate('bracket')
        .populate('matchTeams')
        return matches
    }

}


export const matchesService = new MatchesService()