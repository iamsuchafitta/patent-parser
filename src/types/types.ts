export type Nillable<T> = T | null | undefined;
export type Optional<T> = T | undefined;


String.prototype.clean = function () {
  return this.trim().replace(/\s+/g, ' ');
}

String.prototype.toInt = function () {
  return +this;
}

declare global {
  interface String {
    /** Очистка по RegExp '\s+' + trim(). */
    clean(): string;
    /** Преобразует строку в число. При неудаче вернет NaN без выброса ошибки. */
    toInt(): number;
  }
}
