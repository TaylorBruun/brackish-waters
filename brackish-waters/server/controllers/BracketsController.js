import { Auth0Provider } from "@bcwdev/auth0provider";
import { bracketsService } from "../services/BracketsService";
import BaseController from "../utils/BaseController";



export class BracketsController extends BaseController{
    constructor() {
        super('api/brackets')
        this.router
            .get('/:id', this.getById)
            .post('', this.create)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .delete('/:id', this.deleteBracket)

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