import {ReduceTemplate} from './ReduceTemplate';

/**
 * Class to an array reduce with product.
 */
export class ProdReduce extends ReduceTemplate {
  /**
   * Constructor
   * @param arr Array to reduce
   */
  constructor(protected arr: number[]) {
    super(arr);
  }
  /**
   * Algorithm reduce
   */
  public reduce(): number {
    let result: number = 1;
    this.arr.forEach((element) => {
      result *= element;
    });
    return result;
  }
  /**
   * Hook
   * @returns Returns starting message.
   */
  public beforeReduce(): string {
    const msg: string = 'Starting ProdReduce ...';
    console.log(msg);
    return msg;
  }
  /**
   * Hook
   * @returns Returns finishing message.
   */
  public afterReduce(): string {
    const msg: string = `ProdReduce finished. Result: ${this.reduce()}`;
    console.log(msg);
    return msg;
  }
}