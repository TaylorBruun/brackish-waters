import { Auth0Provider } from '@bcwdev/auth0provider'
import { bracketsService } from '../services/BracketsService'
import { competitionsService } from '../services/CompetitionsService'
import { teamsService } from '../services/TeamsService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'


export class CompetitionsController extends BaseController {
    constructor() {
        super('api/competitions')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .get('/:id/brackets', this.getCompetitionBrackets)
            .get('/:id/teams', this.getCompetitionTeams)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.updateCompetition)
            .delete('/:id', this.deleteCompetition)

    }
    async getAll(req, res, next) {
        try {
            
            const competitions = await competitionsService.getAll(req.query)
            return res.send(competitions)
        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            const competition = await competitionsService.getById(req.params.id)
            return res.send(competition)
        } catch (error) {
            next(error)
        }
    }
    async getCompetitionBrackets(req, res, next) {
        try {
            const brackets = await bracketsService.getCompetitionBrackets(req.params.id)
            return res.send(brackets)
        } catch (error) {
            next(error)
        }
    }
    async getCompetitionTeams(req, res, next) {
        try {
            const teams = await teamsService.getCompetitionTeams(req.params.id)
            return res.send(teams)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            const competition = await competitionsService.create(req.body)
            return res.send(competition)
        } catch (error) {
            next(error)
        }
    }
    async updateCompetition(req, res, next) {
        try {
            
            const competition = await competitionsService.updateCompetition(req.body, req.params.id)
            return res.send(competition)
        } catch (error) {
            next(error)
        }
    }
    async deleteCompetition(req, res, next) {
        try {
            const competition = await competitionsService.deleteCompetition(req.body)
            return res.send(competition)
        } catch (error) {
            next(error)
        }
    }
}