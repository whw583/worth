import { parseString, Builder } from 'xml2js'

export async function preprocessXML(xml: string): Promise<string> {
    const obj = await new Promise((resolve, reject) => {
        parseString(
            xml,
            {
                trim: true,
                attrNameProcessors: [attrNameProcessors],
                tagNameProcessors: [tagNameProcessors],
            },
            function(err, result) {
                if (err) {
                    return reject(err)
                } else {
                    resolve(result)
                }
            }
        )
    })

    return new Builder().buildObject(obj)
}

//

function attrNameProcessors(name: string) {
    // Remove 'aws:' prefix.
    name = name.replace(/^aws:/, '')
    // Make first char lower case.
    return name.charAt(0).toLowerCase() + name.slice(1)
}

function tagNameProcessors(name: string) {
    // Remove 'aws:' prefix.
    name = name.replace(/^aws:/, '')
    // Make first char lower case.
    return name.charAt(0).toLowerCase() + name.slice(1)
}
