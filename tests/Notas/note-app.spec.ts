import {exec} from 'child_process';
import 'mocha';
import {expect} from 'chai';
import {existsSync, readFile} from 'fs';
import {Note} from '../../src/Notas/Note';

describe('Note app tests', () => {
  let note: Note;
  let testNote: Note;
  it('add --user="User" --title="Red note" --body="This note is red" --color="red" adds a new note', () => {
    exec('node dist/Notas/note-app.js add --user="User" --title="Red note" --body="This note is red" --color="red"', (err) => {
      if (err) {
        throw err;
      } else {
        readFile('src/Notas/User/Red note.json', (err, data) => {
          if (err) {
            throw err;
          } else {
            note = Note.deserialize(JSON.parse(data.toString()));
            testNote = new Note('User', 'Red note', 'This note is red', 'red');
            expect(note).to.be.eql(testNote);
            exec('node dist/Notas/note-app.js edit --user="User" --title="Red note" --newTitle="Yellow note" --body="This note is yellow" --color="yellow"', (err) => {
              if (err) {
                throw err;
              } else {
                readFile('src/Notas/User/Yellow note.json', (err, data) => {
                  if (err) {
                    throw err;
                  } else {
                    note = Note.deserialize(JSON.parse(data.toString()));
                    testNote = new Note('User', 'Yellow note', 'This note is yellow', 'yellow');
                    expect(note).to.be.eql(testNote);
                    exec('node dist/Notas/note-app.js list --user="User"', (err) => {
                      if (err) {
                        throw err;
                      } else {
                        exec('node dist/Notas/note-app.js read --user="User" --title="Yellow note"', (err) => {
                          if (err) {
                            throw err;
                          } else {
                            exec('node dist/Notas/note-app.js remove --user="User" --title="Yellow note"', (err) => {
                              if (err) {
                                throw err;
                              } else {
                                expect(existsSync('src/Notas/User/Yellow note.json')).to.be.equal(false);
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
});


