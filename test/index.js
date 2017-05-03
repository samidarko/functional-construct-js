import chai from 'chai';
const expect = chai.expect;
import {
    assertNotEmpytList,
    id,
    head,
    last,
    init,
    tail,
    reduce,
    filter,
    map,
    forEach, // TODO
    reduceRight,
    mapWithReduceRight,
    filterWithReduceRight,
    lengthWithReduceLeft,
    lengthWithReduceRight,
} from '../src';

const arr = [1, 2, 3, 4, 5];

describe('functions', () => {
    describe('assertNotEmpytList', () => {
        it('should return undefined', () => {
            expect(assertNotEmpytList('fn', [1])).to.be.undefined;
        });
        it('should throw an error if empty array', () => {
            const fnName = 'fn';
            expect(() => assertNotEmpytList(fnName, [])).to.throw(Error, `${fnName}: empty list`);
        });
        it('should throw an error if not an array', () => {
            const fnName = 'fn';
            expect(() => assertNotEmpytList(fnName, {})).to.throw(Error, `${fnName}: empty list`);
        });
        // TODO if undefined?
    });
    describe('id', () => {
        it('should to return undefined', () => {
            expect(id(undefined)).to.be.undefined;
        });
        it('should to return 1', () => {
            expect(id(1)).to.equal(1);
        });
        it('should to return an array', () => {
            expect(id([1, 2, 3])).to.deep.equal([1, 2, 3]);
        });
    });
    describe('head', () => {
        it('should throw an error if empty array', () => {
            const fnName = 'head';
            expect(() => head([])).to.throw(Error, `${fnName}: empty list`);
        });
        it('should return array\'s head if array is length === 1', () => {
            expect(head([1])).to.deep.equal(1);
        });
        it('should return array\'s head', () => {
            expect(head(arr)).to.deep.equal(1);
        });
    });
    describe('last', () => {
        it('should throw an error if empty array', () => {
            const fnName = 'last';
            expect(() => last([])).to.throw(Error, `${fnName}: empty list`);
        });
        it('should return an empty if array is length === 1', () => {
            expect(last([1])).to.deep.equal(1);
        });
        it('should return array\'s head', () => {
            expect(last(arr)).to.deep.equal(5);
        });
    });
    describe('init', () => {
        it('should throw an error if empty array', () => {
            const fnName = 'init';
            expect(() => init([])).to.throw(Error, `${fnName}: empty list`);
        });
        it('should return an empty if array is length === 1', () => {
            expect(init([1])).to.deep.equal([]);
        });
        it('should return array\'s init', () => {
            expect(init(arr)).to.deep.equal([1, 2, 3, 4]);
        });
    });
    describe('tail', () => {
        it('should throw an error if empty array', () => {
            const fnName = 'tail';
            expect(() => tail([])).to.throw(Error, `${fnName}: empty list`);
        });
        it('should return an empty if array is length === 1', () => {
            expect(tail([1])).to.deep.equal([]);
        });
        it('should return array\'s tail', () => {
            expect(tail(arr)).to.deep.equal([2, 3, 4, 5]);
        });
    });
    describe('reduce', () => {
        it('should return 0 if empty array', () => {
            expect(reduce((acc, value) => acc + value, 0, [])).to.equal(0);
        });
        it('should return 15', () => {
            expect(reduce((acc, value) => acc + value, 0, arr)).to.equal(15);
        });
    });
    describe('filter', () => {
        it('should return an empty array', () => {
            expect(filter(value => value % 2 === 0, [])).to.deep.equal([]);
        });
        it('should return even number', () => {
            expect(filter(value => value % 2 === 0, arr)).to.deep.equal([2, 4]);
        });
    });
    describe('map', () => {
        it('should return an empty array', () => {
            expect(map(value => value * 2, [])).to.deep.equal([]);
        });
        it('should return values multiplied by 2', () => {
            expect(map(value => value * 2, arr)).to.deep.equal([2, 4, 6, 8, 10]);
        });
    });
    describe('forEach', () => {

    });
    describe('reduceRight', () => {
        it('should return 0 if empty array', () => {
            expect(reduceRight((value, acc) => value - acc, 0, [])).to.equal(0);
        });
        it('should return 15', () => {
            expect(reduceRight((value, acc) => value - acc, 0, arr)).to.equal(3);
        });
    });
    describe('filterWithReduceRight', () => {
        it('should return an empty array', () => {
            expect(filterWithReduceRight(value => value % 2 === 0, [])).to.deep.equal([]);
        });
        it('should return even number', () => {
            expect(filterWithReduceRight(value => value % 2 === 0, arr)).to.deep.equal([2, 4]);
        });
    });
    describe('mapWithReduceRight', () => {
        it('should return an empty array', () => {
            expect(mapWithReduceRight(value => value * 2, [])).to.deep.equal([]);
        });
        it('should return values multiplied by 2', () => {
            expect(mapWithReduceRight(value => value * 2, arr)).to.deep.equal([2, 4, 6, 8, 10]);
        });
    });
    describe('lengthWithReduceLeft', () => {
        it('should return a length of 0 for empty array', () => {
            expect(lengthWithReduceLeft([])).to.equal(0);
        });
        it('should return a length of 5 for array', () => {
            expect(lengthWithReduceLeft(arr)).to.equal(5);
        });
    });
    describe('lengthWithReduceRight', () => {
        it('should return a length of 0 for empty array', () => {
            expect(lengthWithReduceRight([])).to.equal(0);
        });
        it('should return a length of 5 for array', () => {
            expect(lengthWithReduceRight(arr)).to.equal(5);
        });
    });
});
