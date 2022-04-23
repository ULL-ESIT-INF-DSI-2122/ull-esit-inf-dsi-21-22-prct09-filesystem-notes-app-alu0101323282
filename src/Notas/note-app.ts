/* eslint-disable no-unused-vars */
import * as yargs from 'yargs';
import {existsSync, writeFile, mkdir, readdir, readFile, rename, rm} from 'fs';
import {Note} from './Note';
import * as chalk from 'chalk';

/**
 * Chalk colors
 */
export enum Color {
    BLACK = 'black',
    RED = 'red',
    GREEN = 'green',
    YELLOW = 'yellow',
    BLUE = 'blue',
    MAGENTA = 'magenta',
    CYAN = 'cyan',
    WHITE = 'white',
    GRAY = 'gray'
};


yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    readdir(`src/Notas/${argv.user}`, (err, files) => {
      if (err) {
        if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
          mkdir(`src/Notas/${argv.user}`, {recursive: true}, (err) => {
            if (err) throw err;
          });
          writeFile(`src/Notas/${argv.user}/${argv.title}.json`, JSON.stringify(new Note(argv.user, argv.title, argv.body, argv.color)), (err) => {
            if (err) {
              console.log(chalk.red('Something went wrong when writing your file'));
            } else {
              console.log(chalk.green('New note added!'));
            }
          });
        }
      } else {
        let alreadyExists: boolean = false;
        files.forEach((file) => {
          if (file === argv.title + '.json') {
            alreadyExists = true;
          }
        });
        if (alreadyExists) {
          console.log(chalk.red('There is already a note with that name'));
          alreadyExists = false;
        } else {
          if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
            writeFile(`src/Notas/${argv.user}/${argv.title}.json`, JSON.stringify(new Note(argv.user, argv.title, argv.body, argv.color)), (err) => {
              if (err) {
                console.log(chalk.red('Something went wrong when writing your file'));
              } else {
                console.log(chalk.green(`New note added!`));
              }
            });
          }
        }
      }
    });
  },
});

yargs.command({
  command: 'edit',
  describe: 'Edit a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    newTitle: {
      describe: 'New note title',
      demandOption: false,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (existsSync(`src/Notas/${argv.user}/${argv.title}.json`)) {
      if (argv.newTitle) {
        readdir(`src/Notas/${argv.user}`, (err, files) => {
          if (err) {
            throw err;
          } else {
            let alreadyExists: boolean = false;
            files.forEach((file) => {
              if (file === argv.newTitle + '.json') {
                alreadyExists = true;
              }
            });
            if (alreadyExists) {
              console.log(chalk.red('There is already a note with that name'));
            } else {
              if (typeof argv.user === 'string' && typeof argv.newTitle === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
                rename(`src/Notas/${argv.user}/${argv.title}.json`, `src/Notas/${argv.user}/${argv.newTitle}.json`, (err) => {
                  if (err) throw err;
                });
                writeFile(`src/Notas/${argv.user}/${argv.newTitle}.json`, JSON.stringify(new Note(argv.user, argv.newTitle, argv.body, argv.color)), (err) => {
                  if (err) {
                    console.log(chalk.red('Something went wrong when writing your file'));
                  } else {
                    console.log(chalk.green(`Note edited!`));
                  }
                });
              }
            }
          }
        });
      } else {
        if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
          writeFile(`src/Notas/${argv.user}/${argv.title}.json`, JSON.stringify(new Note(argv.user, argv.title, argv.body, argv.color)), (err) => {
            if (err) {
              console.log(chalk.red('Something went wrong when writing your file'));
            } else {
              console.log(chalk.green(`Note edited!`));
            }
          });
        }
      }
    } else {
      console.log(chalk.red('Note not found'));
    }
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (existsSync(`src/Notas/${argv.user}/${argv.title}.json`)) {
      rm(`src/Notas/${argv.user}/${argv.title}.json`, (err) => {
        if (err) {
          throw err;
        } else {
          console.log(chalk.green('Note removed!'));
        }
      });
    } else {
      console.log(chalk.red('Note not found'));
    }
  },
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (existsSync(`src/Notas/${argv.user}/${argv.title}.json`)) {
      if (typeof argv.user === 'string') {
        console.log(chalk.green('Your notes'));
        readFile(`src/Notas/${argv.user}/${argv.title}.json`, (err, data) => {
          if (err) {
            console.log(chalk.red('There must be a problem with the file you are trying to read'));
          } else {
            let note: Note = Note.deserialize(JSON.parse(data.toString()));
            let color: string = note.getColor();
            let body: string = note.getBody();
            switch (color) {
              case Color.RED:
                console.log(chalk.red(argv.title));
                console.log(chalk.red(body));
                break;
              case Color.GREEN:
                console.log(chalk.green(argv.title));
                console.log(chalk.green(body));
                break;
              case Color.YELLOW:
                console.log(chalk.yellow(argv.title));
                console.log(chalk.yellow(body));
                break;
              case Color.BLUE:
                console.log(chalk.blue(argv.title));
                console.log(chalk.blue(body));
                break;
            }
          }
        });
      }
    } else {
      console.log(chalk.red('Note not found'));
    }
  },
});

yargs.command({
  command: 'list',
  describe: 'List user notes',
  builder: {
    user: {
      describe: 'User name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      readdir(`src/Notas/${argv.user}`, (err, files) => {
        if (err) {
          throw err;
        } else {
          console.log(chalk.green('Your notes'));
          files.forEach((file) => {
            readFile(`src/Notas/${argv.user}/${file}`, (err, data) => {
              if (err) {
                console.log(chalk.red('There must be a problem with the file you are trying to read'));
              } else {
                let color = Note.deserialize(JSON.parse(data.toString())).getColor();
                let filename: string = file.substring(0, file.length-5);
                switch (color) {
                  case Color.RED:
                    console.log(chalk.red(filename));
                    break;
                  case Color.GREEN:
                    console.log(chalk.green(filename));
                    break;
                  case Color.YELLOW:
                    console.log(chalk.yellow(filename));
                    break;
                  case Color.BLUE:
                    console.log(chalk.blue(filename));
                    break;
                }
              }
            });
          });
        }
      });
    }
  },
});
yargs.parse();