export function toJsonSet(items: readonly unknown[]): ReadonlySet<string> {
  return new Set(items.map(item => JSON.stringify(item)));
}
