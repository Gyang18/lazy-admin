export interface LoadshInterface {
  chunk(arr: any[], size: number): Array<[]>;
  concat(arr: any[], ...args: any[]): any[];
  debounce(fn: () => void, wait: number, options?: {}): () => void;
  throttle(fn: () => void, wait: number, options?: {}): () => void;
  curry(fn: () => any): (...arg: any[]) => any;
}
