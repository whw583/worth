import { model, Schema } from 'mongoose'

const schema = new Schema({
    dataUrl: {
        type: String,
        required: true,
        useCreateIndex: true,
        unique: true,
    },
    rank: { type: Number, required: true },
    speed: Object,
    siteData: Object,
    adultContent: String,
    language: Object,
    linksInCount: Number,
    ownedDomains: [Object],
    rankByCountry: [Object],
    categories: [Object],
    usageStatistics: [Object],
    contributingSubdomains: [Object],
    lastModified: { type: Date, required: true },
})

export const UrlInfo = model('UrlInfo', schema)
