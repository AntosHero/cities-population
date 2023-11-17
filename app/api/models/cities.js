// You can use with or assert for fast import, but this feature is experimental,
// so I've skipped it for better stability, also eslint still do not support it
// import cities from '../data/cities.json' assert { type: "json" };
import { readFile } from 'fs/promises';
import path from 'path';

import * as Utils from '../utils/utils.js'

// We can work without path, but readFile reads from root, can be hard to debug in large projects
const dir = path.join('app/api/data', 'cities.json')

export const getCities = async (filter) => {
    let cities = JSON.parse(await readFile(dir, 'utf8'));
    if (filter) {
        // it is better to have case insensitive search
        cities = await cities.filter((city) => city?.name.toLowerCase().includes(filter.toLowerCase()));
        if (cities.length === 0) return [];
    }
    const result = await Utils.calculateDensity(cities);
    return result
}

export const getCitiesSorted = async (key, sortOrder, filter) => {
    const cities = await getCities(filter);
    const result = await Utils.sortBy(cities, key, sortOrder);
    return result;
}

export const addCity = async (body) => {
    const cities = JSON.parse(await readFile(dir, 'utf8'));
    await cities.push(body)
    await Utils.writeJSONFile(dir, cities);
}



