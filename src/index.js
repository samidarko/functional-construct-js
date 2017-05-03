// import R from 'ramda';
// TODO improve signature like add index and array

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

function reduce(fn, initial, collection) {
    const first = collection[0];
    return (first !== undefined) ? reduce(fn, fn(initial, first), tail(collection)) : initial;
}

function filter(fn, collection) {
    return reduce((acc, value) => fn(value) ? acc.concat(value) : acc, [], collection);
}

function map(fn, collection) {
    return reduce((acc, value) => acc.concat(fn(value)), [], collection);
}

function forEach(fn, collection) {
    reduce((_, value) => fn(value), undefined, collection);
}

function reduceRight(fn, initial, collection) {
    return (collection.length > 0) ?
        reduceRight(fn, fn(initial, last(collection)), init(collection)) : initial;
}

function mapWithReduceRight(fn, collection) {
    function step(xs, x) {
        return [fn(x), ...xs];
    }

    return reduceRight(step, [], collection);
}

function filterWithReduceRight(fn, collection) {
    function step(xs, x) {
        return fn(x) ? [x, ...xs] : xs;
    }

    return reduceRight(step, [], collection);
}

function lengthWithReduceLeft(collection) {
    return reduce((acc, _) => acc + 1, 0, collection);
}

function lengthWithReduceRight(collection) {
    return reduceRight((xs, _) => xs + 1, 0, collection);
}

function reverseWithReduceLeft(collection) {
    return reduce((acc, value) => [value, ...acc], [], collection)
}

function reverseWithReduceRight(collection) {
    return reduceRight((previous, current) => previous.concat(current), [], collection)
}

function maxWithReduceLeft(collection) {
    assertNotEmpytList('maxWithReduceLeft', collection);
    return reduce((acc, value) => value > acc ? value : acc, Number.NEGATIVE_INFINITY, collection)
}

function maxWithReduceRight(collection) {
    assertNotEmpytList('maxWithReduceRight', collection);
    return reduceRight((acc, value) => value > acc ? value : acc, Number.NEGATIVE_INFINITY, collection)
}

function minWithReduceLeft(collection) {
    assertNotEmpytList('minWithReduceLeft', collection);
    return reduce((acc, value) => value < acc ? value : acc, Number.POSITIVE_INFINITY, collection)
}

function minWithReduceRight(collection) {
    assertNotEmpytList('minWithReduceRight', collection);
    return reduceRight((acc, value) => value < acc ? value : acc, Number.POSITIVE_INFINITY, collection)
}

// function reduceLeftWithReduceRight(fn, initial, collection) {
//     function step(x, ys) {
//         return [fn(x), ...ys];
//     }
//     return reduceRight(step, [], collection);
// }

// myFoldl :: (a -> b -> a) -> a -> [b] -> a
// myFoldl f initial collection = foldr step id collection initial
// where step x g a = g (f a x)

// reduceRightWithReduceLeft ?

// TODO review reduceRight signature as reduceRight(function(previousValue, currentValue, index, array)

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
    lengthWithReduceRight,
    reverseWithReduceLeft,
    reverseWithReduceRight,
    minWithReduceLeft,
    minWithReduceRight,
    maxWithReduceLeft,
    maxWithReduceRight
}
