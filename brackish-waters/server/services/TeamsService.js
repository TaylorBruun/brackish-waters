import { dbContext } from "../db/DbContext"



class TeamsService{
    async create(body) {
        let team = await dbContext.Teams.create(body)
        await team.populate('competition')
        return team

    }
    async edit(update) {
        let original = await dbContext.Teams.findById(update.id)
        .populate('competition')
        original.name = update.name ? update.name : original.name
        original.img = update.img ? update.img : original.img
        original.save()
        return original
    }
    async deleteTeam(body) {
        let team = await dbContext.Teams.findById(body.id)
        await team.remove()
        return team
    }
    async getCompetitionTeams(competitionId) {
        const teams = await dbContext.Teams.find({competitionId: competitionId})
        .populate('competition')
        return teams
    }

}

export const teamsService = new TeamsService()