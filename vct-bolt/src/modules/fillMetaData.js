export default function fillMetaData(page, title, price) {
    let pageTitle = 'Интернет магазине krop.com.ua';
    let pageDescription = 'krop.com.ua. ☎: (099) 70-17-001. Быстрая доставка ✈ Гарантия качества ☑ Отличная цена $';
    let pageKeywords = 'Купить принтер, Купить запчасти, Купить вал, Купить МФУ, krop.com.ua';
    const metaBlocks = Array.from(document.getElementsByTagName('META'));
    switch (page) {
        case 'productPage':
            pageTitle = `${title} купить за ${price} грн в интернет магазине krop.com.ua`;
            pageDescription = `${title} – купить на ➦ krop.com.ua. ☎: (099) 70-17-001. Быстрая доставка ✈ Гарантия качества ☑ Отличная цена $`;
            pageKeywords = `Купить ${title} в Кировограде, Купить ${title} в Кропивницком, Купить ${title} Украина, Купить ${title}, Купить ${title} krop.com.ua`;
            break;
        default:
            break;
    }
    document.title = pageTitle;
    metaBlocks.filter(item => item.name === 'description')[0].content = pageDescription;
    metaBlocks.filter(item => item.name === 'keywords')[0].content = pageKeywords;
};