import { IncomingMessage } from 'http';

const makeLink = (req: IncomingMessage) => (endpoint: string) => {
  const { host = '' } = req.headers;
  const protocol = host.includes('localhost') ? 'http' : 'https';
  return `${protocol}://${host}/api${endpoint}`;
};

export default makeLink;
