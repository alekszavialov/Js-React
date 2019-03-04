const objArray = [
    {
        Name: 'Alex',
        age: 22,
        HaveAPet: true,
        HaveAlergies: true,
    },
    {
        Name: 'User',
        age: 18,
        HaveAPet: false,
        HaveAlergies: false,
    },
    {
        Name: 'Ink',
        age: 33,
        HaveAPet: false,
        HaveAlergies: true,
    },
    {
        Name: 'Des',
        age: 15,
        HaveAPet: false,
        HaveAlergies: false,
    },
    {
        Name: 'Lilly',
        age: 45,
        HaveAPet: true,
        HaveAlergies: true,
    },
];

window.onload = function () {

    const haveAPetCheck = document.getElementById('haveAPet');
    const haveAlergiesCheck = document.getElementById('haveAlergies');
    const ageInput = document.getElementById('age');
    const ageInputLabel = findLabelForAge('age');
    const sortedForm = document.getElementById('sortedVar');
    const sortedBody = document.getElementById('sortedList');

    function findLabelForAge(id) {
        let labels = document.getElementsByTagName('label');
        for (let i = 0; i < labels.length; i++) {
            if (labels[i].htmlFor === id)
                return labels[i];
        }
    }

    function getTextFromObj(item) {
        let text = '';
        for (let prop in  item) {
            text += prop + " " + item[prop] + " ";
        }
        return text;
    }

    function loadData(objArray) {
        let newArray = Array.from(objArray).map(item => {
            let newItem = document.createElement('li');
            newItem.innerText = getTextFromObj(item);
            return newItem;
        });
        sortedBody.innerText = '';
        newArray.forEach(function (item) {
            sortedBody.appendChild(item);
        });
    }

    loadData(objArray);

    ageInput.addEventListener('change', function () {
        ageInputLabel.innerText = 'age ' + this.value;
    });

    function sortData(checked, checked1, value) {
        return objArray.filter(item => {
            return item.age >= parseInt(value) &&
                (checked ? item[checked] : true) &&
                (checked1 ? item[checked1] : true);
        });
    }

    sortedForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let sortedArray = sortData(haveAPetCheck.checked ? haveAPetCheck.value : false,
            haveAlergiesCheck.checked ? haveAlergiesCheck.value : false,
            ageInput.value);
        loadData(sortedArray);
    });

};

