import {ReduceTemplate} from './ReduceTemplate';

/**
 * Class to an array reduce with divition.
 */
export class DivReduce extends ReduceTemplate {
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
    let result: number = Math.pow(this.arr[0], 2);
    this.arr.forEach((element) => {
      result /= element;
    });
    return Math.trunc(result);
  }
  /**
   * Hook
   * @returns Returns starting message.
   */
  public beforeReduce(): string {
    const msg: string = 'Starting DivReduce ...';
    console.log(msg);
    return msg;
  }
  /**
   * Hook
   * @returns Returns finishing message.
   */
  public afterReduce(): string {
    const msg: string = `DivReduce finished. Result: ${this.reduce()}`;
    console.log(msg);
    return msg;
  }
}