// import fs from 'fs'
import { unsupportedDataType } from "../consts/consts.js";

export const sortBy = (data, key, order) => {
    if (!order) order = 'asc';
    return order === 'asc' ? data.sort(sortWrapper(key)) : data.sort(sortWrapper(key)).reverse();
}

export const calculateDensity = (data) => {
    return data.map((item) => {
        const area = item?.area;
        const density = area ? (item?.population / area).toFixed(2) : 'Invalid'
        return {...item, density: density }
    })
}

// export const writeJSONFile = (filename, content) => {
//     fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
//         if (err) {
//             console.log(err)
//         }
//     })
// }

const sortWrapper = (key) => {
    return function(a, b) {
        return sortFields(a[key], b[key])
    }
}

const sortFields = (a, b) => {
    if (typeof a === 'number'){
        return a - b;
    } else if (typeof a === 'string') {
        return a.localeCompare(b) ;
    } else {
        throw Error(unsupportedDataType)
    }
}

