window.onload = function () {

    const form = document.querySelector('form.reduce-form');

    function reduceForm() {
        let formElement = Array.from(form.elements);
        let newArray = formElement.reduce((acc, item) => {
            if (item.name){
                if (item.value === ''){
                    return false;
                }
                acc[item.name] = item.value;
            }
            return acc;
        }, {});
        if (newArray){
            console.log(newArray);
        }
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        reduceForm();
    });

};