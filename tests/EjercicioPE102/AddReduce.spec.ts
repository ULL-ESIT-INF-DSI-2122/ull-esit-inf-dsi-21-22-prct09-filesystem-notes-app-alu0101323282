import 'mocha';
import {expect} from 'chai';
import {AddReduce} from '../../src/EjercicioPE102/AddReduce';

describe('Pruebas clase AddReduce', () => {
  let addReduce: AddReduce;
  before(function() {
    addReduce = new AddReduce([4, 8, 5, 6]);
  });
  it('new AddReduce([4, 8, 5, 6]) is not equal null', () => {
    expect(new AddReduce([4, 8, 5, 6])).not.to.be.equal(null);
  });
  it('addReduce.run() returns 23', () => {
    expect(addReduce.run()).to.be.equal(23);
  });
  it('addReduce.reduce() returns 23', () => {
    expect(addReduce.reduce()).to.be.equal(23);
  });
  it(`addReduce.beforeReduce() returns 'Starting AddReduce ...'`, () => {
    expect(addReduce.beforeReduce()).to.be.equal('Starting AddReduce ...');
  });
  it(`addReduce.afterReduce() returns ''AddReduce finished. Result: 23''`, () => {
    expect(addReduce.afterReduce()).to.be.equal('AddReduce finished. Result: 23');
  });
});