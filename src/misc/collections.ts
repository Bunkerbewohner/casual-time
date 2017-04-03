export function range(startIncl: number, endExcl: number): number[] {
    const result = new Array(endExcl - startIncl)
    for (let i = startIncl, j = 0; i < endExcl; i++, j++) {
        result[j] = i
    }
    return result
}