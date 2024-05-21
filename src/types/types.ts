export type Nillable<T> = T | null | undefined;
export type Optional<T> = T | undefined;


String.prototype.clean = function () {
  return this.trim().replace(/\s+/g, ' ');
};

String.prototype.structuredClean = function () {
  return this.trim().replace(/ {2,}/g, ' ').replace(/ *\n */g, '\n');
};

String.prototype.toInt = function () {
  return +this;
};

declare global {
  interface String {
    /** Удаление пробелов по краям, замена последовательных white-spaces на один пробел */
    clean(): string;

    /** Удаление повторяющихся пробелов с сохранением переносов строки. */
    structuredClean(): string;

    /** Преобразует строку в число. При неудаче вернет NaN без выброса ошибки. */
    toInt(): number;
  }
}
