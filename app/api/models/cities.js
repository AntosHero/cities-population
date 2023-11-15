// You can use with or assert for fast import, but this feature is experimental,
// so I've skipped it for better stability, also eslint still do not support it
// import cities from '../data/cities.json' assert { type: "json" };
import {readFile} from 'fs/promises';
import path from 'path';
import * as Consts from '../consts/consts.js';
import * as Utils from '../utils/utils.js'

// We can work without path, but readFile reads from root, can be hard to debug in large projects
const dir = path.join('app/api/data', 'cities.json')
export let cities = JSON.parse(await readFile(dir, 'utf8'));

export const getCities = () => {
    return new Promise((resolve, reject) => {
        if (cities.length === 0) {
            reject(Consts.emptyData);
        }
        resolve(JSON.stringify(cities));
    })
}

export const getCitiesSorted = (key, sortOrder) => {
    return new Promise((resolve, reject) => {
        if (cities.length === 0) {
            reject(Consts.emptyData);
        }
        const sortedCities = Utils.sortBy(cities, key, sortOrder);
        resolve(JSON.stringify(sortedCities));
    })
}

// function insertCity(item) {}

