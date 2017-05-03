// import R from 'ramda';
// TODO improve signature like add index and array

const arr = [1, 2, 3, 4, 5];

function assertNotEmpytList(fnName, list) {
    if (list.length === undefined || list.length <= 0) throw new Error(`${fnName}: empty list`);
}

function id(x) {
    return x;
}

function head(list) {
    assertNotEmpytList('head', list);
    if (list.length === undefined || list.length <= 0) throw new Error(`head: empty list`);
    return list[0];
}

function last(list) {
    assertNotEmpytList('last', list);
    return list[list.length - 1];
}

function init(list) {
    assertNotEmpytList('init', list);
    if (list.length === 1) {
        return [];
    } else {
        function helper(initial, collection) {
            return collection.length > 1 ? helper(initial.concat(head(collection)), collection.slice(1)) : initial;
        }

        return helper([], list);
    }
}

function tail(list) {
    assertNotEmpytList('tail', list);
    return (list.length === 1) ? [] : list.slice(1);
}

// TODO use tail and head
function reduce(fn, initial, collection) {
    const [head, ...tail] = collection;
    return (head !== undefined) ? reduce(fn, fn(initial, head), tail) : initial;
}


// console.log('native reduce', arr.reduce((acc, value) => acc + value, 0));
// console.log('custom reduce', reduce((acc, value) => acc + value, 0, arr));

function filter(fn, collection) {
    return reduce((acc, value) => fn(value) ? acc.concat(value) : acc, [], collection);
}

// console.log('native filter', arr.filter(value => value % 2 === 0));
// console.log('custom filter', filter(value => value % 2 === 0, arr));

function map(fn, collection) {
    return reduce((acc, value) => acc.concat(fn(value)), [], collection);
}

// console.log('native map', arr.map(value => value * 2));
// console.log('custom map', map(value => value * 2, arr));

function forEach(fn, collection) {
    reduce((_, value) => fn(value), undefined, collection);
}

// console.log('native forEach', arr.forEach(x => console.log(x)));
// console.log('custom forEach', forEach(x => console.log(x), arr));

function reduceRight(fn, initial, collection) {
    return (collection.length > 0) ?
        reduceRight(fn, fn(last(collection), initial), init(collection)) : initial;
}

// console.log('native reduceRight', R.reduceRight((value, acc) => value - acc, 0, arr));
// console.log('custom reduceRight', reduceRight((value, acc) => value - acc, 0, arr));


function mapWithReduceRight(fn, collection) {
    function step(x, ys) {
        return [fn(x), ...ys];
    }

    return reduceRight(step, [], collection);
}

// console.log('custom mapWithReduceRight', mapWithReduceRight(value => value * 2, arr));

function filterWithReduceRight(fn, collection) {
    function step(x, ys) {
        return fn(x) ? [x, ...ys] : ys;
    }

    return reduceRight(step, [], collection);
}

// console.log('custom filterWithReduceRight', filterWithReduceRight(value => value % 2 === 0, arr));

function lengthWithReduceLeft(collection) {
    return reduce((acc, _) => acc + 1, 0, collection);
}

function lengthWithReduceRight(collection) {
    return reduceRight((_, acc) => acc + 1, 0, collection);
}

// console.log('native length', arr.length);
// console.log('custom lengthWithReduceLeft', lengthWithReduceLeft(arr));
// console.log('custom lengthWithReduceRight', lengthWithReduceRight(arr));

// function reduceLeftWithReduceRight(fn, initial, collection) {
//     function step(x, ys) {
//         return [fn(x), ...ys];
//     }
//     return reduceRight(step, [], collection);
// }

// myFoldl :: (a -> b -> a) -> a -> [b] -> a
// myFoldl f initial collection = foldr step id collection initial
// where step x g a = g (f a x)


// console.log('custom reduceLeftWithReduceRight', reduceLeftWithReduceRight((acc, value) => acc + value, 0, arr));

// reduceRightWithReduceLeft ?
// reverseWithFoldLeft
// reverseWithFoldRight

export {
    assertNotEmpytList,
    id,
    head,
    last,
    init,
    tail,
    reduce,
    filter,
    map,
    forEach,
    reduceRight,
    mapWithReduceRight,
    filterWithReduceRight,
    lengthWithReduceLeft,
    lengthWithReduceRight
}
