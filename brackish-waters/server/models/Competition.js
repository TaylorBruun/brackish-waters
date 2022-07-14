import mongoose from 'mongoose'
const Schema = mongoose.Schema


export const CompetitionSchema = new Schema(
    {
        name: { type: String, required: true },
        startDate: { type: Date, required: true },
        img: { type: String, required: true },
        description: { type: String, required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);