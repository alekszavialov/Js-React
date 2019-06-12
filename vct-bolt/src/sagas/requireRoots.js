import cyrillicToTranslit from 'cyrillic-to-translit-js';

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

const mutateSliderData = (data) => data.map(item => {
        return {
            article: item.id,
            description: item.configuration,
            href: `/product-${item.id}-${cyrillicToTranslit().transform(item.title.replace(/\//g, ''), '_').toLowerCase()}`,
            name: item.title,
            price: item.price,
            src: item.img === "" ? 'https://vct1.com/img/nophoto.jpg' : item.img
        };
    }
);

const mutateSpecifications = (data) => data.filter(item => item.description && item.value);
const filterSortData = (data) => {
    return data.map((item,index) => {
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
};

export function mutateData(name, data) {
    switch (name) {
        case 'productItemsData':
        case 'catalogData':
        case 'filterData':
            return mutateSales(data);
        case 'newProducts':
            return mutateSliderData(data);
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
