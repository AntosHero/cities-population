// You can use with or assert for fast import, but this feature is experimental,
// so I've skipped it for better stability, also eslint still do not support it
// import cities from '../data/cities.json' assert { type: "json" };
import { readFile } from 'fs/promises';
import path from 'path';
import * as Consts from '../consts/consts.js';
import * as Utils from '../utils/utils.js'

// We can work without path, but readFile reads from root, can be hard to debug in large projects
const dir = path.join('app/api/data', 'cities.json')

export const getCities = async (filter) => {
    let cities = JSON.parse(await readFile(dir, 'utf8'));
    if (filter) {
        // it is better to have case insensitive search
        cities = await cities.filter((city) => city?.name.toLowerCase().includes(filter.toLowerCase()));
    }
    const result = await getCitiesDensity(cities);
    return result
}

const getCitiesDensity = async(cities) => {
    if (cities.length === 0) {
        throw new Error(Consts.emptyData);
    }
    return await Utils.calculateDensity(cities);
}

export const getCitiesSorted = async (key, sortOrder, filter) => {
    const cities = await getCities(filter);
    const result = await sortCities(cities, key, sortOrder);
    return result;
}

const sortCities = async(cities, key, sortOrder) => {
    if (cities.length === 0) {
        throw new Error(Consts.emptyData);
    }
    return await Utils.sortBy(cities, key, sortOrder);
}

// function insertCity(item) {}

