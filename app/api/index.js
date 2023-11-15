import express from 'express';
import helmet from 'helmet';
import http from 'http';
import { expressCspHeader } from 'express-csp-header';
import {validationResult} from 'express-validator';

import { getCitiesHandler, postCitiesHandler } from './routes/routes.js';
import { schemaValidator } from './utils/utils.js';
import * as Consts from './consts/consts.js';

const app = express()
const port = 8081

export const server = http.Server(app);

// helmet sets up http response headers
// https://www.npmjs.com/package/helmet
app.use(helmet());

app.use(express.json());

app.use(expressCspHeader({
    policies: {
        'default-src': [expressCspHeader.NONE],
        'img-src': [expressCspHeader.SELF],
    }
}));

app.options('*', function(_, res) {
	res.send(200);
});

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	res.setHeader("Content-Type", "application/json");
	next();
});

app.route('/cities')
	.get(async (req, res) => {
		getCitiesHandler(req, res)
	})
	.post(schemaValidator, async (req, res) => {
		const valRes = validationResult(req)
		if (valRes.errors.length != 0) {
			return res.status(Consts.badRequest.status).json({message : Consts.badRequest.message});
		}
		postCitiesHandler(req, res);
});

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	console.log('Server is running on port 8081');
});