const cardsDeck1 = {from: 1, to: 3};
cardsDeck1[Symbol.iterator] = iterator;
const cardsDeck2 = {from: 6, to: 20};
cardsDeck2[Symbol.iterator] = iterator;
const cardsDeck3 = {from: 1, to: 5};
cardsDeck3[Symbol.iterator] = iterator;
const cardsDeck4 = {from: 6, to: 10};
cardsDeck4[Symbol.iterator] = iterator;

function mixArrays(arr1, arr2) {
    let newArray = [];
    let item1 = arr1[Symbol.iterator]();
    let item2 = arr2[Symbol.iterator]();

    while (item1.hasNext() || item2.hasNext()) {
        if (item1.hasNext()) {
            newArray.push(item1.next().value)
        }
        if (item2.hasNext()) {
            newArray.push(item2.next().value)
        }
    }
    return newArray.join(' ');
}

function iterator() {
    let current = this.from;
    let last = this.to;
    return {
        next() {
            if (current <= last) {
                return {
                    done: false,
                    value: current++
                };
            } else {
                return {
                    done: true
                };
            }
        },
        hasNext() {
            return current <= last;
        }
    }
}

const mixedCards = mixArrays(cardsDeck1, cardsDeck2);
const mixedCards1 = mixArrays(cardsDeck3, cardsDeck4);

console.log(...[mixedCards]);
console.log(...[mixedCards1]);