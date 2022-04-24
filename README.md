# __Práctica 9 - Aplicación de procesamiento de notas de texto__ 
  ### Marc Carbonell González de Chaves
  [![Tests](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101323282/actions/workflows/tests.yml/badge.svg)](https://github.com/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101323282/actions/workflows/tests.yml)
  [![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101323282/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2122/ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101323282?branch=main)
  [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101323282&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ULL-ESIT-INF-DSI-2122_ull-esit-inf-dsi-21-22-prct09-filesystem-notes-app-alu0101323282)
  ## __Tareas previas__
   1. Acepté la [asignación de Github Classroom](https://classroom.github.com/a/8yO8h5vy).
   2. Durante el desarrollo de la práctica utilicé [yargs](https://www.npmjs.com/package/yargs) y [chalk](https://www.npmjs.com/package/chalk).
   3. Me familiaricé con el [API síncrona proporcionada por Node.js para trabajar con el sistema de ficheros](https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#synchronous-api).
  
  ## __Planteamiento__
   
  Para este ejercicio he desarrollado una única clase `Note` que contiene las propiedades de una nota es decir, usuario creador, título, cuerpo y color de la nota. Esta clase
  contiene getters para cada una de las cuatro propiedades y un método `deserialized()` para convertir notas en formato json en objetos `Note`.
  
  ``` typescript
  export class Note {
    constructor(private readonly user: string, private readonly title: string,
        private readonly body: string, private readonly color: string) {}
    getUser(): string {
      return this.user;
    }
    getTitle(): string {
      return this.title;
    }
    getBody(): string {
      return this.body;
    }
    getColor(): string {
      return this.color;
    }
    public static deserialize(note: NoteInterface): Note {
      return new Note(note.user, note.title, note.body, note.color);
    }
  }
  ```
Cabe señalar que para el correcto funcionamiento de este último método he creado también una interfaz NoteInterfaze que contine las propiedades de una nota.

``` typescript
export interface NoteInterface {
    user: string,
    title: string,
    body: string,
    color: string
}
```

Por último, he creado la clase abstracta `NoteManger` que implementa los métodos necesarios para ejecutar cada uno de los comandos de la aplicación, estos serán llamados desde sus manejadores.

``` typescript
export abstract class NoteManager {

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
```

 ## __Comandos__
 Para cada una de las funcionalidades de la aplicación de procesamiento de notas de texto, es decir, crear, modificar, eliminar, leer y listar notas, 
 he creado un commando utilizando [yargs](https://www.npmjs.com/package/yargs). Los métodos utilizados por los manejadores manejadores de todos estos comandos se encuentran definidos dentro de la clase abstracta `NoteManager` y utilizan funciones asíncronas para su funcionamiento, así como el paquete
 chalks para mostrar los mensajes en el color correspondiente en cada caso.
 ### __Crear notas__
 Para la creación de nuevas notas he creado el comando `add` que recibe como parámetros obligatorios el nombre del usuario que quiere crear la nota `user`, el título de
 la nota `title`, el cuerpo de la nota `body`, y el color de la nota `color`. Todos estos parámetros son pasados al método `addNote` de la clase `NoteManager` donde , en primer lugar, la función asíncrona `readdir` lee el directorio
 de notas perteneciente al usuario que quiere crear la nota, en caso de error se procede ha crear dicho directorio mediante `mkdir` y ha crear la nota
 dentro del mismo con `writeFile`. En caso contrario se comprueba si existe ya una nota con ese mismo nombre dentro del directorio, si dicha nota ya existe se devuelve un 
 mensaje de error, y si no se procede a crear la nueva nota mediante `writeFile`.
 
 
 ``` typescript
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
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      NoteManager.addNote(argv.user, argv.title, argv.body, argv.color);
    }
  },
});
 ```
 
 ### __Modificar notas__
 En el caso de la modificación de notas he creado el comando `edit` que recibe como parámetros obligatorios el nombre del usuario que quiere modificar la nota `user`, el título de
 la nota `title`, el cuerpo de la nota `body`, y el color de la nota `color`, y como parámetro opcional un nuevo título `newTitle`. Todos estos parámetros son pasados al método `editNote` de la clase `NoteManager` donde , en primer lugar,
 se comprueba mediante la función `existsSync` que la nota que se quiere editar existe, en caso contrario se muestra un mensaje de error. Si la nota a editar si existe
 se comprueba si se ha pasado como parámetro un nuevo título para dicha nota, en cuyo caso, tras comprobar si no existe ya una nota con ese mismo nombre dentro del directorio (utilizando
 la función `readdir`) , se procede a renombrar la nota con `rename` y a sobreescribir sus propiedades con `writeFile`. Si no se indica un nuevo título para la nota esta se reescribe directamente con `writeFile`.
 
 ``` typescript
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
    if (typeof argv.user === 'string' && typeof argv.title === 'string' && typeof argv.body === 'string' && typeof argv.color === 'string') {
      if (typeof argv.newTitle === 'string') {
        NoteManager.editNote(argv.user, argv.title, argv.body, argv.color, argv.newTitle);
      } else {
        NoteManager.editNote(argv.user, argv.title, argv.body, argv.color);
      }
    }
  },
});
```
 
### __Borrar notas__
Para el borrado de notas he creado el comando `remove` que recibe como parámetros obligatorios el nombre del usuario que quiere borrar la nota `user` y el título de
la nota `title`. Estos parámetros son pasados al método `removeNote` de la clase `NoteManager` el cual comprueba con la función `existsSync` que la nota indicada existe y la elimina mediante `rm`. En caso contrario muestra un mensaje de error.
 
 ``` typescript
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
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      NoteManager.removeNote(argv.user, argv.title);
    }
  },
});
```
 
### __Leer notas__
Para leer el contenido de las notas he creado el comando `read` que recibe como parámetros obligatorios el nombre del usuario que quiere leer la nota `user` y el título de
la nota `title`. Estos parámetros son pasados al método `readNote` de la clase `NoteManager` el cual comprueba con la función `existsSync` que la nota indicada existe y extrae la información del fichero con `readFile`. La nota obtenida en formato
json es deserializada con el método `deserialize()` de la clase `Note` para poder extraer sus propiedades mediante los getters correspondientes, y, mediante un `switch`, 
se muestra por pantalla el título y contenido de la nota en su color correspondiente. En caso de que la nota a leer no exista se muestra un mensaje de error.
 
 ``` typescript
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
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      NoteManager.readNote(argv.user, argv.title);
    }
  },
});
```

### __Listar notas__
Para listar las notas de un usuario he creado el comando `list` que recibe como único parámetro obligatorio el nombre del usuario que quiere listar sus notas `user`.
Este parámetro es pasado al método `listNotes` de la clase `NoteManager` el cual lee el contenido del directorio del usuario mediante `readdir`. y por cada fichero extrae su información con `readFile`, deserializa la nota con 
`deserialize()` de la clase `Note` para extraer sus propiedades y mediante un `switch` mostrar cada nota en su color correspondiente.

``` typescript
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
      NoteManager.listNotes(argv.user);
    }
  },
});
```