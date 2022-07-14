import { Auth0Provider } from "@bcwdev/auth0provider";
import { bracketsService } from "../services/BracketsService";
import { matchesService } from "../services/MatchesService";
import BaseController from "../utils/BaseController";



export class BracketsController extends BaseController{
    constructor() {
        super('api/brackets')
        this.router
            .get('/:id', this.getById)
            .get(':/id/matches', this.getBracketMatches)
            .post('', this.create)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .delete('/:id', this.deleteBracket)

    }
    async getBracketMatches(req, res, next) {
        try {
            let bracketId = req.params.id
            const matches = await matchesService.getBracketMatches(bracketId)
            return res.send(matches)
        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next) {
        try {
            const bracket = await bracketsService.getById(req.params.id)
            return res.send(bracket)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next) {
        try {
            const bracket = await bracketsService.create(req.body)
            return res.send(bracket)
        } catch (error) {
            next(error)
        }
    }
    
    async deleteBracket(req, res, next) {
        try {
            const bracket = await bracketsService.deleteBracket(req.body)
            return res.send(bracket)
        } catch (error) {
            next(error)
        }
    }
}