/* Util function related to list operations */

/**
 * Function to group certain elements in an list by a key
 * @param list
 * @param keyGetter
 * @returns A map with keyof T as key and T[] as value
 */
export function groupBy<T>(list: Array<T>, keyGetter: (item: T) => T[keyof T]) {
  // Create a new map
  const map = new Map<T[keyof T], T[]>()
  // Iterate over the list and group the items
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    // If the item doesn't exist in the collection, make a new entry
    // else push
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  return map
}

/* Sorting Utility functions */
export function sortByDate(a: string, b: string, desc: boolean = false) {
  if (Date.parse(a) === Date.parse(b)) return 0
  // if a < b then -1, else 1 (for ascending order, from later to newest)
  const comparison = Date.parse(a) < Date.parse(b) ? -1 : 1
  // If descending, then negate the result
  return desc ? -comparison : comparison
}

/* Reduction Utility */

/**
 * Reduces an object T, based on the values and getters
 * @param list The list to reduce
 * @param field The key of T which to reduce by
 * @param operation The operation function to perform on the two reducing instances
 */
export function simpleReduce<T>(
  list: Array<T>,
  field: keyof T,
  operation: (prev: T[keyof T], curr: T[keyof T]) => T[keyof T],
) {
  return list.reduce((previous, current) => {
    const obj = { ...previous }
    obj[field] = operation(previous[field], current[field])
    return obj
  })
}

export type ReducedEntries<T> = {
  groupKey: T[keyof T]
  entries: T[]
}
/**
 * Reduces the grouped element Maps, to an array of objects
 */
export function reduceToGroupedEntries<T>(
  list: Array<T>,
  keyGetter: (item: T) => T[keyof T],
  compareFn?: (a: ReducedEntries<T>, b: ReducedEntries<T>) => number,
) {
  // Get the grouped entries
  const groupedEntries = groupBy(list, keyGetter)
  // Iterate over the map and fill the object array
  const entries = Array<ReducedEntries<T>>()
  groupedEntries.forEach((groupEntries, groupKey) => {
    entries.push({ groupKey, entries: groupEntries })
  })
  return compareFn ? entries.sort(compareFn) : entries
}
