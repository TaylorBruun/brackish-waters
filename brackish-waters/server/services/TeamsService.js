import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"



class TeamsService{
    async create(body) {
        let team = await dbContext.Teams.create(body)
        await team.populate('competition')
        return team

    }
    async edit(update) {
        let original = await dbContext.Teams.findById(update.id)
        await original.populate('competition')
        if(!original){
            throw new BadRequest('A team with that Id was not found')
        }
        original.name = update.name ? update.name : original.name
        original.img = update.img ? update.img : original.img
        original.save()
        return original
    }
    async deleteTeam(id) {
        let team = await dbContext.Teams.findById(id)
        if(!team){
            throw new BadRequest('A team with that Id was not found')
        }
        await team.remove()
        return team
    }
    async getCompetitionTeams(competitionId) {
        const teams = await dbContext.Teams.find({ competitionId: competitionId })
            .populate('competition')
        return teams
    }

}

export const teamsService = new TeamsService()