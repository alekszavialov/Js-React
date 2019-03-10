let somePerson, anotherPerson, andOneMorePerson;
somePerson = {};
anotherPerson = {};
andOneMorePerson = {};

let getUniqueId = (() => {
    let id = 0;

    return () => {
        return id++;
    };
    
})();

somePerson.id = getUniqueId(); // 1
console.log(somePerson.id);
anotherPerson.id = getUniqueId(); // 2
// few useless calls
getUniqueId();
getUniqueId();
andOneMorePerson.id = getUniqueId(); // 5
console.log(andOneMorePerson.id);
