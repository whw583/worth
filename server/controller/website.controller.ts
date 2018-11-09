import { Website } from '../model/website'

async function  getOneByDomain(domain: string) {
  const res = await  Website.findOne({ domain: domain })
}
