/**
import 'mocha';
import {expect} from 'chai';
import {NoteManager} from '../../src/Notas/NoteManager';

describe('Pruebas clase NoteManager', () => {
  it(`new Note('User', 'Yellow note', 'This note is yellow', 'yellow') is not equal null`, () => {
    expect(NoteManager.addNote('User', 'Yellow note', 'This note is yellow', 'yellow')).not.to.be.equal(null);
  });
  it(`new Note('User', 'TestNote', 'Note for testing', 'red') is not equal null`, () => {
    expect(NoteManager.editNote('User', 'Yellow note', 'This note is red', 'red', 'Red note')).not.to.be.equal(null);
  });
  it(`new Note('User', 'TestNote', 'Note for testing', 'red') is not equal null`, () => {
    expect(NoteManager.listNotes('User')).not.to.be.equal(null);
  });
  it(`new Note('User', 'TestNote', 'Note for testing', 'red') is not equal null`, () => {
    expect(NoteManager.readNote('User', 'Red note')).not.to.be.equal(null);
  });
  it(`new Note('User', 'TestNote', 'Note for testing', 'red') is not equal null`, () => {
    expect(NoteManager.removeNote('User', 'Red note')).not.to.be.equal(null);
  });
});
*/