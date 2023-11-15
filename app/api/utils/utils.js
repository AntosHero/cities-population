// import fs from 'fs'

export const sortBy = (data, key, order) => {
    return order === 'asc' ? data.sort(sortWrapper(key)) : data.sort(sortWrapper(key)).reverse()
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
        throw Error('The sorting is not supported for this data type')
    }

}

