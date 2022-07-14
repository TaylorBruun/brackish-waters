import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { bracketsService } from '../services/BracketsService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/:brackets', this.getAccountBrackets)
  }
  async getAccountBrackets(req, res, next) {
    try {
      const brackets = await bracketsService.getAccountTickets(req.userInfo.id)
      res.send(brackets)
    } catch (error) {
      next(error)
    }
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
