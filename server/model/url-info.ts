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
    usageStatistics: {
        type: [Object],
        required: true,
    },
    contributingSubdomains: [Object],
    lastModified: { type: Number, required: true },
})

export const UrlInfo = model('UrlInfo', schema)
