import { XmlDocument } from 'xmldoc'

export async function parseXml(xml: string): Promise<object> {
    const document = new XmlDocument(xml)
    console.log(document)
    return document
}
