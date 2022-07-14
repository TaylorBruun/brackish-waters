import mongoose from 'mongoose'
const Schema = mongoose.Schema


export const MatchSchema = new Schema(
    {
        round: {type: String, enum: ['F', 'SF', 'TP', 'QF', 'R16']},
        teams: [{type: Schema.Types.ObjectId, ref:'Team', required: true}],
        winningTeam: {type: Schema.Types.ObjectId, ref:'Team'},
        bracketId: { type: Schema.Types.ObjectId, ref: 'Bracket', required: true },     
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

MatchSchema.virtual('bracket',{
    localField: 'bracketId',
    ref: 'Bracket',
    foreignField: '_id',
    justOne: true
})