import { getOne } from './get'
import { updateOrCreateOne } from './update'
import { createIfNotExist } from './create'

const report = { getOne, updateOrCreateOne, createIfNotExist }

export { report }
