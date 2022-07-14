import mongoose from 'mongoose'
const Schema = mongoose.Schema


export const BracketSchema = new Schema(
    {
        name: { type: String, required: true },
        competitionId: { type: Schema.Types.ObjectId, ref: 'Bracket', required: true },
        creatorId: { type: Schema.Types.ObjectId, ref:'Account'},
        
    },
    { timestamps: true, toJSON: { virtuals: true } }
)


BracketSchema.virtual('competition',{
    localField: 'competitionId',
    ref: 'Competition',
    foreignField: '_id',
    justOne: true
})