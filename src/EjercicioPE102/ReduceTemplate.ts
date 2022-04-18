/**
 * Template for reduce algorithms
 */
export abstract class ReduceTemplate {
  /**
   * Constructor
   * @param arr Array de entrada
   */
  constructor(protected arr: number[]) {}

  /**
   * Runs the algorithm.
   * @returns Returns algorithms result.
   */
  public run() {
    // Hook
    this.beforeReduce();
    // Run reduce algorithm
    const result: number = this.reduce();
    // Hook
    this.afterReduce();
    return result;
  }
  /**
   * Algorithm reduce
   */
  protected abstract reduce(): number;
  /**
   * Hook
   */
  protected beforeReduce() {}
  /**
   * Hook
   */
  protected afterReduce() {}
}

