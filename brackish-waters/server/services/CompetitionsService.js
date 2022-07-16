
import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { logger } from "../utils/Logger"


class CompetitionsService{
    async getAll(query = {}) {
        let competitions =await dbContext.Competitions.find(query)
        return competitions
    }
    async getById(id) {
        let competition = await dbContext.Competitions.findById(id)
        if(!competition){
            throw new BadRequest('A competition with that Id was not found')
        }
        return competition
    }
    
    async create(body) {
        let competition = await dbContext.Competitions.create(body)
        return competition
    }
    async updateCompetition(body, competitionId) {
        const original = await dbContext.Competitions.findById(competitionId)
        if(!original){
            throw new BadRequest('A competition with that Id was not found')
        }
        original.name = body.name ? body.name : original.name
        original.startDate = body.startDate ? body.startDate : original.startDate
        original.img = body.img ? body.img : original.img
        original.description = body.description ? body.description : original.description
        original.save()
        return original
    }
    async deleteCompetition(id) {
        const competition = await this.getById(id)
        await competition.remove()
        return competition
    }

}


export const competitionsService = new CompetitionsService()