export const extend = (obj: { [p: string]: any }, ext: any | undefined) => {
    for (let key in ext) {
        if (ext.hasOwnProperty(key)) {
            obj[key] = ext[key];
        }
    }
    return obj;
};

export const mapString = (str: string, fn: any) => {
    return str.split("").map(fn).join("");
};

export const sample = (arr: string | any[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

export const each = (arr: string | any[], fn: (arg0: any, arg1: number) => void) => {
    for (let i = 0, l = arr.length; i < l; i++) {
        fn(arr[i], i);
    }
};

export const getTruthyIndices = (arr: any | undefined) => {
    return arr
        .map((item: any, index: any) => {
            if (!item) return false;
            return index;
        })
        .filter((i: any) => i !== false);
};

export const getElements = (obj: string) => {
    return [].slice.call(document.querySelectorAll(obj));
};
