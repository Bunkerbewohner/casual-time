export function range(startIncl: number, endExcl: number): number[] {
    const result = new Array(endExcl - startIncl)
    for (let i = startIncl, j = 0; i < endExcl; i++, j++) {
        result[j] = i
    }
    return result
}

/**
 * Returns the first item of the collection that matches the predicate or undefined.
 * @param items any collection of items
 * @param predicate a function that returns true or false for a given item
 */
export function any<T>(items: T[], predicate: (item: T)=>boolean): T | undefined {
    if (!items) return undefined
    for (let item of items) {
        if (predicate(item)) {
            return item
        }
    }
    return undefined
}