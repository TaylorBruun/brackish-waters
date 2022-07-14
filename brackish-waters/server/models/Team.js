import mongoose from 'mongoose'
const Schema = mongoose.Schema


export const TeamSchema = new Schema(
    {
        name: { type: String, required: true },
        competitionId: { type: Schema.Types.ObjectId, ref: 'Bracket', required: true },
        img: {type: String, required: true},
        
    },
    { timestamps: true, toJSON: { virtuals: true } }
)


TeamSchema.virtual('competition',{
    localField: 'competitionId',
    ref: 'Bracket',
    foreignField: '_id',
})