
import { dbContext } from "../db/DbContext"
import { logger } from "../utils/Logger"


class CompetitionsService{
    async getAll(query = {}) {
        let competitions =await dbContext.Competitions.find(query)
        return competitions
    }
    async getById(id) {
        let competition = await dbContext.Competitions.findById(id)
        return competition
    }
    
    async create(body) {
        let competition = await dbContext.Competitions.create(body)
        return competition
    }
    async updateCompetition(body, competitionId) {
        const original = await dbContext.Competitions.findById(competitionId)
        original.name = body.name ? body.name : original.name
        original.startDate = body.startDate ? body.startDate : original.startDate
        original.img = body.img ? body.img : original.img
        original.description = body.description ? body.description : original.description
        original.save()
        return original
    }
    async deleteCompetition(body) {
        const competition = await dbContext.Competitions.findById(body.id)
        await competition.remove()
        return competition
    }

}


export const competitionsService = new CompetitionsService()