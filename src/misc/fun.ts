/**
 * Returns a function that compares its single argument to x
 * @param x something to compare to
 */
export function equalsX<T>(x: T): (a: T) => boolean {
    return a => a === x
}