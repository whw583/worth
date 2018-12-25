// These are important and needed before anything else
import 'zone.js/dist/zone-node'
import 'reflect-metadata'

import { renderModuleFactory } from '@angular/platform-server'
import { enableProdMode } from '@angular/core'

import { join } from 'path'
import { readFileSync } from 'fs'

const DIST_FOLDER = join(process.cwd(), 'dist')

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode()

// Our index.html we'll use as our template
const template = readFileSync(
    join(DIST_FOLDER, 'worth', 'index.html')
).toString()

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP,
} = require('../../../dist/worth-server/main')

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader')

export async function getHtml(url: string) {
    return await renderModuleFactory(AppServerModuleNgFactory, {
        // Our index.html
        document: template,
        url: url,
        // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
        extraProviders: [provideModuleMap(LAZY_MODULE_MAP)],
    })
}
