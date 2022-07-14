import { dbContext } from "../db/DbContext"



class TeamsService{
    async getCompetitionTeams(competitionId) {
        const teams = await dbContext.Teams.find({competitionId: competitionId})
        .populate('competition')
        return teams
    }

}

export const teamsService = new TeamsService()