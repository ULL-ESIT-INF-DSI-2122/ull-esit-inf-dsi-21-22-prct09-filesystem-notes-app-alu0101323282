import 'mocha';
import {expect} from 'chai';
import {SubReduce} from '../../src/EjercicioPE102/SubReduce';

describe('Pruebas clase SubReduce', () => {
  let subReduce: SubReduce;
  before(function() {
    subReduce = new SubReduce([4, 8, 5, 6]);
  });
  it('new SubReduce([4, 8, 5, 6]) is not equal null', () => {
    expect(new SubReduce([4, 8, 5, 6])).not.to.be.equal(null);
  });
  it('subReduce.run() returns 23', () => {
    expect(subReduce.run()).to.be.equal(-15);
  });
  it('subReduce.reduce() returns 23', () => {
    expect(subReduce.reduce()).to.be.equal(-15);
  });
  it(`subReduce.beforeReduce() returns 'Starting SubReduce ...'`, () => {
    expect(subReduce.beforeReduce()).to.be.equal('Starting SubReduce ...');
  });
  it(`subReduce.afterReduce() returns ''SubReduce finished. Result: -15''`, () => {
    expect(subReduce.afterReduce()).to.be.equal('SubReduce finished. Result: -15');
  });
});