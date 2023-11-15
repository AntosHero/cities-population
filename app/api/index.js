import express from 'express';
import helmet from 'helmet';
import http from 'http';
import { getCities } from './models/cities.js';

// import {getCities} from './cities';

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

app.all('/', (req, res) => {
	if (req.method === 'GET') {
        getCities().then(data => res.send(data));
	}
});

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	console.log('Test');
});