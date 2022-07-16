import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"



class MatchesService{

    
    async create(body) {
        let match = await dbContext.Matches.create(body)
        await match.populate('bracket')
        return match
    }

    // NOTE I don't think this is needed, its original use would be to set a winner of a match for the admin bracket, but the match will not exist until the admin goes to update the bracket anyway. Admin will create match with a winner, not update a previously existing match.
    // async updateMatch(body) {
    //     let match = await dbContext.Matches.findById(body.id)
        
    // }
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
        return matches
    }

}


export const matchesService = new MatchesService()