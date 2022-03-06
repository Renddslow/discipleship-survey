import dotenv from 'dotenv';

dotenv.config();

import polka, { Next } from 'polka';
import sirv from 'sirv';
import { IncomingMessage, ServerResponse } from 'http';
import zlib from 'zlib';
import { promisify } from 'util';

import makeLink from './makeLink';
import surveys from './controllers/surveys';
import subdomainExists from './middlewares/subdomainExists';

const PORT = process.env.PORT || 8080;

const serve = sirv('public', { single: true, ignores: ['/api'] });

const compress = promisify(zlib.brotliCompress);

const resJson = (req: IncomingMessage, res: ServerResponse, next: Next) => {
  // @ts-ignore
  res.json = (value: any, status?: number = 200) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = status;
    // @ts-ignore
    res.send(JSON.stringify(value));
  };
  next();
};

const brotli = (req: IncomingMessage, res: ServerResponse, next: Next) => {
  // @ts-ignore
  res.send = async (value: string) => {
    res.setHeader('Content-Encoding', 'br');
    const compressed = await compress(value);
    res.setHeader('Content-Length', compressed.length);
    res.end(compressed);
  };
  next();
};

polka()
  .use(serve, brotli, resJson, subdomainExists)
  .get('/healthz', (req, res) => {
    res.end('OK');
  })
  .get('/api', (req, res) => {
    const linkify = makeLink(req);
    res.json({
      data: {
        type: 'organization',
        id: '<abcd>',
        links: {
          surveys: linkify('/surveys'),
          users: linkify('/users'),
        },
      },
    });
  })
  .use('/api', polka().use('/surveys', surveys).use('/users'))
  .listen(PORT, () => console.log(`⛪️ > Running Discipleship Survey server on port ${PORT}`));