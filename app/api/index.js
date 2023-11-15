import express from 'express';
import helmet from 'helmet';
import http from 'http';
import { getCities, getCitiesSorted } from './models/cities.js';

const app = express()
const port = 8081

export const server = http.Server(app);

// helmet sets up http response headers
// https://www.npmjs.com/package/helmet
app.use(helmet());

app.use(express.json());

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

app.options('*', function(_, res) {
	res.send(200);
});

app.get('/cities', async(req, res) => {
	if (req.method === 'GET') {
		let sort = req.query.sort;
		let sortOrder = req.query.sortOrder;
		let contains = req.query.contains;
		//The default sort order is asc
		if(sort) {
			try{
				const data = await getCitiesSorted(sort, sortOrder, contains);
				res.status(200).json({message: 'Success', data});
			}
			catch (err) {
				res.status(err.status ? err.status : 500).json({message: err.message});
			}
		} else {
			try{
				const data = await getCities(contains);
				res.status(200).json({message: 'Success', data});
			}
			catch (err) {
				res.status(err.status ? err.status : 500).json({message: err.message});
			}
		}
	}
});

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	console.log('Server is running on port 8081');
});