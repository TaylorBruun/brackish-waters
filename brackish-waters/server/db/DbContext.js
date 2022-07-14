import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { BracketSchema } from '../models/Bracket';
import { CompetitionSchema } from '../models/Competition';
import { MatchSchema } from '../models/Match';
import { TeamSchema } from '../models/Team';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Brackets = mongoose.model('Bracket', BracketSchema);
  Competitions = mongoose.model('Competition', CompetitionSchema);
  Matches= mongoose.model('Match', MatchSchema);
  Teams= mongoose.model('Team', TeamSchema)
}

export const dbContext = new DbContext()
