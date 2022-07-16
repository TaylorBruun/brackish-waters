import { Auth0Provider } from "@bcwdev/auth0provider";
import { matchesService } from "../services/MatchesService";
import BaseController from "../utils/BaseController";


export class MatchesController extends BaseController {
    constructor() {
        super('api/matches')
        this.router
            .post('', this.create)
            .use(Auth0Provider.getAuthorizedUserInfo)
            // NOTE this is likely unneeded, as described in the matchesService
            // .put('/:id', this.updateMatch)
            .delete('/:id', this.deleteMatch)

    }
    async create(req, res, next) {
        try {
            const match = await matchesService.create(req.body)
            return res.send(match)
        } catch (error) {
            next(error)
        }
    }
    // async updateMatch(req, res, next) {
    //     try {
    //         const match = await matchesService.updateMatch(req.body)
    //         return res.send(match)
    //     } catch (error) {
    //         next(error)
    //     }
    // }
    async deleteMatch(req, res, next) {
        try {
            const match = await matchesService.deleteMatch(req.params.id)
            return res.send(match)
        } catch (error) {
            next(error)
        }
    }
}