import 'mocha';
import {expect} from 'chai';
import {DivReduce} from '../../src/EjercicioPE102/DivReduce';

describe('Pruebas clase DivReduce', () => {
  let divReduce: DivReduce;
  before(function() {
    divReduce = new DivReduce([4, 8, 5, 6]);
  });
  it('new DivReduce([4, 8, 5, 6]) is not equal null', () => {
    expect(new DivReduce([4, 8, 5, 6])).not.to.be.equal(null);
  });
  it('divReduce.run() returns 23', () => {
    expect(divReduce.run()).to.be.equal(0);
  });
  it('divReduce.reduce() returns 23', () => {
    expect(divReduce.reduce()).to.be.equal(0);
  });
  it(`divReduce.beforeReduce() returns 'Starting DivReduce ...'`, () => {
    expect(divReduce.beforeReduce()).to.be.equal('Starting DivReduce ...');
  });
  it(`divReduce.afterReduce() returns ''DivReduce finished. Result: 0''`, () => {
    expect(divReduce.afterReduce()).to.be.equal('DivReduce finished. Result: 0');
  });
});