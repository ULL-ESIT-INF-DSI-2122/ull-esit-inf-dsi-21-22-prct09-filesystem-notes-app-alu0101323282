import 'mocha';
import {expect} from 'chai';
import {ProdReduce} from '../../src/EjercicioPE102/ProdReduce';

describe('Pruebas clase ProdReduce', () => {
  let prodReduce: ProdReduce;
  before(function() {
    prodReduce = new ProdReduce([4, 8, 5, 6]);
  });
  it('new SubReduce([4, 8, 5, 6]) is not equal null', () => {
    expect(new ProdReduce([4, 8, 5, 6])).not.to.be.equal(null);
  });
  it('prodReduce.run() returns 23', () => {
    expect(prodReduce.run()).to.be.equal(960);
  });
  it('prodReduce.reduce() returns 23', () => {
    expect(prodReduce.reduce()).to.be.equal(960);
  });
  it(`prodReduce.beforeReduce() returns 'Starting ProdReduce ...'`, () => {
    expect(prodReduce.beforeReduce()).to.be.equal('Starting ProdReduce ...');
  });
  it(`prodReduce.afterReduce() returns ''ProdReduce finished. Result: 960''`, () => {
    expect(prodReduce.afterReduce()).to.be.equal('ProdReduce finished. Result: 960');
  });
});