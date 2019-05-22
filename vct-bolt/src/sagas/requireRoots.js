export default function requireFiles(url) {
    switch (url) {
        case 'catalogProductItemsData':
            return require('../fakeAPI/catalogProductItemsData.json');
        case 'carouselOneItemData':
            return require('../fakeAPI/carouselOneItemData.json');
        case 'productOptionsData':
            return require('../fakeAPI/productOptionsData.json');
        case 'catalogBreadCrumbs':
            return require('../fakeAPI/catalogBreadCrumbs.json');
        case 'catalogShopTags':
            return require('../fakeAPI/catalogShopTags.json');
        case 'catalogPageTabsData':
            return require('../fakeAPI/catalogPageTabsData.json');
        case 'carouselManyItemsData':
            return require('../fakeAPI/carouselManyItemsData.json');
        case 'mainPopularCategoriesItems':
            return require('../fakeAPI/mainPopularCategoriesItems.json');
        case 'catalogItems':
            return require('../fakeAPI/catalogItems.json');
        case 'productPageData':
            return require('../fakeAPI/productPageData.json');
        case 'mainPageTabsData':
            return require('../fakeAPI/mainPageTabsData.json');
        case 'productPageTabsData':
            return require('../fakeAPI/productPageTabsData.json');
        case 'productPageBreadCrumbs':
            return require('../fakeAPI/productPageBreadCrumbs.json');
        default:
            return null;
    }
}

const mutateSales = (data) => data.map(item => {
        return { ...item, url: `/${item.url.replace(/\//gi, '-').substring(1)}` };
    }
);

export function mutateData(name, data) {
    switch (name) {
        case 'topSales':
            return mutateSales(data);
        default:
            return data;
    }
}

