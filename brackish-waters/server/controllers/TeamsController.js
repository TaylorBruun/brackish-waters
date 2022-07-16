import { Auth0Provider } from "@bcwdev/auth0provider";
import { teamsService } from "../services/TeamsService";
import BaseController from "../utils/BaseController";


export class TeamsController extends BaseController {
    constructor() {
        super('api/teams')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.deleteTeam)
    }
    async create(req, res, next) {
        try {
            const team = await teamsService.create(req.body)
            return res.send(team)
        } catch (error) {
            next(error)
        }
    }
    async edit(req, res, next) {
        try {
            req.body.id = req.params.id
            const team = await teamsService.edit(req.body)
            return res.send(team)
        } catch (error) {
            next(error)
        }
    }
    async deleteTeam(req, res, next) {
        try {
            const team = await teamsService.deleteTeam(req.params.id)
            return res.send(team)
        } catch (error) {
            next(error)
        }
    }
}