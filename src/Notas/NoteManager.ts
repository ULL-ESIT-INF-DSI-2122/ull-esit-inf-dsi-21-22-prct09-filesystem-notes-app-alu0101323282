/* eslint-disable no-unused-vars */
import {existsSync, mkdir, readdir, readFile, rename, rm, writeFile} from 'fs';
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

/**
 * Class to manage notes.
 */
export abstract class NoteManager {
  /**
   * Adds a new note.
   * @param user User
   * @param title Title
   * @param body Body
   * @param color Color
   */
  public static addNote(user: string, title: string, body: string, color: string) {
    readdir(`src/Notas/${user}`, (err, files) => {
      if (err) {
        mkdir(`src/Notas/${user}`, {recursive: true}, (err) => {
          if (err) throw err;
        });
        writeFile(`src/Notas/${user}/${title}.json`, JSON.stringify(new Note(user, title, body, color)), (err) => {
          if (err) {
            console.log(chalk.red('Something went wrong when writing your file'));
          } else {
            console.log(chalk.green(`Note created!`));
          }
        });
      } else {
        let alreadyExists: boolean = false;
        files.forEach((file) => {
          if (file === title + '.json') {
            alreadyExists = true;
          }
        });
        if (alreadyExists) {
          console.log(chalk.red('There is already a note with that name'));
          alreadyExists = false;
        } else {
          writeFile(`src/Notas/${user}/${title}.json`, JSON.stringify(new Note(user, title, body, color)), (err) => {
            if (err) {
              console.log(chalk.red('Something went wrong when writing your file'));
            } else {
              console.log(chalk.green(`Note created!`));
            }
          });
        }
      }
    });
  }

  /**
   * Edits a note.
   * @param user User
   * @param title Title
   * @param body Body
   * @param color Color
   * @param newTitle New Title
   */
  public static editNote(user: string, title: string, body: string, color: string, newTitle?: string) {
    if (existsSync(`src/Notas/${user}/${title}.json`)) {
      if (newTitle) {
        readdir(`src/Notas/${user}`, (err, files) => {
          if (err) {
            throw err;
          } else {
            let alreadyExists: boolean = false;
            files.forEach((file) => {
              if (file === newTitle + '.json') {
                alreadyExists = true;
              }
            });
            if (alreadyExists) {
              console.log(chalk.red('There is already a note with that name'));
            } else {
              rename(`src/Notas/${user}/${title}.json`, `src/Notas/${user}/${newTitle}.json`, (err) => {
                if (err) throw err;
              });
              writeFile(`src/Notas/${user}/${newTitle}.json`, JSON.stringify(new Note(user, newTitle, body, color)), (err) => {
                if (err) {
                  console.log(chalk.red('Something went wrong when writing your file'));
                } else {
                  console.log(chalk.green(`Note edited!`));
                }
              });
            }
          }
        });
      } else {
        writeFile(`src/Notas/${user}/${title}.json`, JSON.stringify(new Note(user, title, body, color)), (err) => {
          if (err) {
            console.log(chalk.red('Something went wrong when writing your file'));
          } else {
            console.log(chalk.green(`Note edited!`));
          }
        });
      }
    } else {
      console.log(chalk.red('Note not found'));
    }
  }

  /**
   * Removes a note.
   * @param user User
   * @param title Title
   */
  public static removeNote(user: string, title: string) {
    if (existsSync(`src/Notas/${user}/${title}.json`)) {
      rm(`src/Notas/${user}/${title}.json`, (err) => {
        if (err) {
          throw err;
        } else {
          console.log(chalk.green('Note removed!'));
        }
      });
    } else {
      console.log(chalk.red('Note not found'));
    }
  }

  /**
   * Reads a note
   * @param user User
   * @param title Title
   */
  public static readNote(user: string, title: string) {
    if (existsSync(`src/Notas/${user}/${title}.json`)) {
      readFile(`src/Notas/${user}/${title}.json`, (err, data) => {
        if (err) {
          console.log(chalk.red('There must be a problem with the file you are trying to read'));
        } else {
          let note: Note = Note.deserialize(JSON.parse(data.toString()));
          let color: string = note.getColor();
          let body: string = note.getBody();
          switch (color) {
            case Color.RED:
              console.log(chalk.red(title));
              console.log(chalk.red(body));
              break;
            case Color.GREEN:
              console.log(chalk.green(title));
              console.log(chalk.green(body));
              break;
            case Color.YELLOW:
              console.log(chalk.yellow(title));
              console.log(chalk.yellow(body));
              break;
            case Color.BLUE:
              console.log(chalk.blue(title));
              console.log(chalk.blue(body));
              break;
          }
        }
      });
    } else {
      console.log(chalk.red('Note not found'));
    }
  }

  /**
   * List notes
   * @param user User
   */
  public static listNotes(user: string) {
    readdir(`src/Notas/${user}`, (err, files) => {
      if (err) {
        throw err;
      } else {
        console.log(chalk.green('Your notes'));
        files.forEach((file) => {
          readFile(`src/Notas/${user}/${file}`, (err, data) => {
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
}