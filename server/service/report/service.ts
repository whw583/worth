import { getOne } from './get'
import { updateOrCreateOne } from './update'
import { createIfNotExist } from './create'
import { generate } from './generate'

const report = { generate, getOne, updateOrCreateOne, createIfNotExist }

export { report }
