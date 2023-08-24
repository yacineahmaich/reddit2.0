export function parseObj<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
