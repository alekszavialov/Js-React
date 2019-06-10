import cyrillicToTranslit from 'cyrillic-to-translit-js';

export function requireFiles(url) {
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
        return {
            ...item,
            url: `/product-${item.id}-${cyrillicToTranslit().transform(item.title.replace(/\//g, ''), '_').toLowerCase()}`,
            img: item.img === "" ? 'https://vct1.com/img/nophoto.jpg' : item.img
        };
    }
);

const mutateProductData = (data) => data.map(item => {
        return {
            ...item,
            img: item.img === "" ? 'https://vct1.com/img/nophoto.jpg' : item.img
        };
    }
);

const mutateSpecifications = (data) => data.filter(item => item.description && item.value);
const filterSortData = (data) => {
    const test = data.map((item,index) => {
        let parameter = "";
        if (item.name === "Цена"){
            parameter = "price";
        } else if (item.name === "Бренд"){
            parameter = "brand";
        } else {
            parameter = `parametr${index - 1}`;
        }
        return {
            ...item,
            items : item.items.filter(itemName => itemName.text !== ""),
            parameter
        };
    }).filter(item => item.items.length > 0);
    return test;
};

export function mutateData(name, data) {
    switch (name) {
        case 'productItemsData':
        case 'catalogData':
        case 'filterData':
            return mutateSales(data);
        case 'sortData':
            return filterSortData(data);
        case 'productData':
            return mutateProductData(data);
        case 'specifications':
            return mutateSpecifications(data);
        default:
            return data;
    }
}
