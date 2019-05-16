require('es6-promise').polyfill();
require('isomorphic-fetch');

export default function fetchApi(url = './fakeAPI/headerItemNavigationItems.json') {
    console.log(url);
    return fetch(url)
        .then(results => results.json());
};



