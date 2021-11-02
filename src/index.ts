import express from 'express';
import fs from 'fs';
import os from 'os';
import roundTo from 'round-to';

const app: express.Application = express();

app.all('/*', (_req: express.Request, res: express.Response, next: express.NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	next();
});

app.get('/', (_req: express.Request, res: express.Response) => {
	let html: string = fs.readFileSync(process.cwd() + '/public/index.html', { encoding: 'utf-8' });

	html = html.replace(/{{ NODE_NAME }}/g, process.env.NODE_NAME ? process.env.NODE_NAME : '');
	html = html.replace(/{{ POD_HOST_IP }}/g, process.env.HOST_IP ? process.env.HOST_IP : '');
	html = html.replace(/{{ POD_NAME }}/g, process.env.POD_NAME ? process.env.POD_NAME : '');
	html = html.replace(/{{ POD_NAMESPACE }}/g, process.env.POD_NAMESPACE ? process.env.POD_NAMESPACE : '');
	html = html.replace(/{{ POD_HOST }}/g, os.hostname());
	html = html.replace(/{{ POD_UPTIME }}/g, os.uptime() + ' secs');
	html = html.replace(/{{ POD_CPU_LOAD }}/g, os.loadavg().toString());
	html = html.replace(/{{ POD_TOTAL_MEMORY }}/g, roundTo(os.totalmem() / (1024 * 1024 * 1024), 2) + ' GB');
	html = html.replace(/{{ POD_FREE_MEMORY }}/g, roundTo(os.freemem() / (1024 * 1024 * 1024), 2) + ' GB');
	html = html.replace(/{{ POD_CPU_COUNT }}/g, os.cpus().length.toString());
	res.setHeader('content-type', 'text/html');
	res.send(html);
});

app.use(express.static('public'));

app.listen(60000, () => {
	console.log('Web server listening at 60000');
});
