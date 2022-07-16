import { Auth0Provider } from "@bcwdev/auth0provider";
import { Logger } from "sass";
import { bracketsService } from "../services/BracketsService";
import { matchesService } from "../services/MatchesService";
import BaseController from "../utils/BaseController";
import { logger } from "../utils/Logger";



export class BracketsController extends BaseController{
    constructor() {
        super('api/brackets')
        this.router
            .get('/:id', this.getById)
            .get('/:id/matches', this.getBracketMatches)
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
// TODO need to still use, but not require, userInfo. Created brackets are not saving user Id as creator Id if there is a user logged in.
    async create(req, res, next) {
        try {
            // if (req.userInfo.id){
                
            //     req.body.creatorId = req.userInfo.id
            // }
            const bracket = await bracketsService.create(req.body)
            return res.send(bracket)
        } catch (error) {
            next(error)
        }
    }
    
    async deleteBracket(req, res, next) {
        try {
            const bracket = await bracketsService.deleteBracket(req.params.id)
            return res.send(bracket)
        } catch (error) {
            next(error)
        }
    }
}