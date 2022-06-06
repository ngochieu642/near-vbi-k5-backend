import { NoSuchElementException } from './exceptions/NoSuchElementException';

export class Optional<T> {
  private value: T;

  private constructor(value: T) {
    if (value !== null && value !== undefined) {
      this.value = value;
    } else {
      this.value = null;
    }
  }

  private static EMPTY = new Optional<null>(null);

  public static empty<T>(): Optional<T> {
    const t: Optional<T> = this.EMPTY;
    return t;
  }

  public static of<T>(value: T): Optional<T> {
    return new Optional<T>(value);
  }

  public get(): T {
    if (this.value == null) {
      throw new NoSuchElementException('No value present');
    }

    return this.value;
  }

  public isPresent(): boolean {
    return this.value !== null;
  }

  public isEmpty(): boolean {
    return this.value === null;
  }
}
