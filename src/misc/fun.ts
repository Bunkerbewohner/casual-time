/**
 * Returns a function that compares its single argument to x
 * @param x something to compare to
 */
export function equalsX<T>(x: T): (a: T) => boolean {
    return a => a === x
}

export function shallowCopy<T>(obj: T): T {
    if (obj instanceof Array) {
        // lists
        return [].concat(obj) as any
    } else if (obj instanceof Object) {
        // objects / maps
        return Object.assign({}, obj)
    } else {
        // number, string, boolean etc.
        return obj
    }
}

export function getIn<M, T>(obj: M, path: string[]): T {
    let cursor: any = obj

    for (let p of path) {
        cursor = cursor[p]
    }

    return cursor
}

export function setIn<M, T>(obj: M, path: string[], value: T): M {
    const objShallowCopy = shallowCopy(obj)
    const key = path[0]

    if (path.length > 1) {
        objShallowCopy[key] = setIn(objShallowCopy[key], path.slice(1), value)
    } else {
        objShallowCopy[key] = value
    }

    return objShallowCopy
}

export function updateIn<M, T>(obj: M, path: string[], update: (item: T) => T): M {
    const before: T = getIn<M, T>(obj, path)
    const after: T = update(before)

    if (before === after) {
        // apparently nothing changed, so we can return this original object
        return obj
    } else {
        return setIn(obj, path, after)
    }
}

export function propsEqualX<T>(x: T, props: string[]): (a: T) => boolean  {
    return (a: T) => {
        for (let prop of props) {
            if (a[prop] !== x[prop]) {
                return false
            }
        }
        return true
    }
}

export function propsNotEqualX<T>(x: T, props: string[]): (a: T) => boolean  {
    return (a: T) => {
        for (let prop of props) {
            if (a[prop] === x[prop]) {
                return false
            }
        }
        return true
    }
}

export function add<T>(list: T[], item: T): T[] {
    const copy = shallowCopy(list)
    copy.push(item)
    return copy
}