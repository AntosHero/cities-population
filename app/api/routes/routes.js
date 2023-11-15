import { getCities, getCitiesSorted, addCity } from '../models/cities.js';
import * as Consts from '../consts/consts.js';

//This method basically handles all our get requests
export const getCitiesHandler = async (req, res) => {
    let sort = req.query.sort;
			let sortOrder = req.query.sortOrder;
			let contains = req.query.contains;
			//The default sort order is asc
			if(sort) {
				try{
					const data = await getCitiesSorted(sort, sortOrder, contains);
					return res.status(Consts.success.status).json({message : Consts.success.message, data});
				}
				catch (err) {
					res.status(err.status ? err.status : 500).json({message: err.message});
				}
			} else {
				try{
					const data = await getCities(contains);
					return res.status(Consts.success.status).json({message : Consts.success.message, data});
				}
				catch (err) {
			res.status(err.status ? err.status : 500).json({message: err.message});
		}
	}
}


//This method will handle our addition of new data
export const postCitiesHandler = async (req, res) => {
    const body = req.body;
    if (body) {
        await addCity(body);
        return res.status(Consts.success.status).json({message : Consts.success.message});
    } else {
        return res.status(Consts.badRequest.status).json({message : Consts.badRequest.message});
    }
}


//This is a method which is a placeholder for unsupported functionality
export const notSupported = (res) => {
    return res.status(Consts.notImplemented.status).json({message : Consts.notImplemented.message});
}