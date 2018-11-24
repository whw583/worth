import { loadXml, getText } from '../common'

export function parseCategoryBrowseToJson(processedXml: string): object {
    const $ = loadXml(processedXml)

    const categories = $('categoryBrowse > categories > category ')
        .map(function(index, element) {
            const category = $(element)
            return {
                path: getText(category, 'path'),
                title: getText(category, 'title'),
                subCategoryCount: getText(category, 'subCategoryCount'),
                totalListingCount: getText(category, 'totalListingCount'),
                description: getText(category, 'description'),
            }
        })
        .get()

    const languageCategories = $(
        'categoryBrowse > languageCategories > category '
    )
        .map(function(index, element) {
            const category = $(element)
            return {
                path: getText(category, 'path'),
                title: getText(category, 'title'),
                subCategoryCount: getText(category, 'subCategoryCount'),
                totalListingCount: getText(category, 'totalListingCount'),
                description: getText(category, 'description'),
            }
        })
        .get()

    const relatedCategories = $(
        'categoryBrowse > relatedCategories > category '
    )
        .map(function(index, element) {
            const category = $(element)
            return {
                path: getText(category, 'path'),
                title: getText(category, 'title'),
                subCategoryCount: getText(category, 'subCategoryCount'),
                totalListingCount: getText(category, 'totalListingCount'),
                description: getText(category, 'description'),
            }
        })
        .get()

    return { categories, languageCategories, relatedCategories }
}
