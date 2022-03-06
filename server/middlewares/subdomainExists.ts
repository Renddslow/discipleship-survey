import { IncomingMessage, ServerResponse } from 'http';
import { Next } from 'polka';
import { getOrganizationByCode } from '../models/organization';

const getSubdomain = (host: string) => {
  if (host.includes('localhost')) return process.env.SUBDOMAIN || '';
  const [sub] = host.split('.');
  return sub;
};

const subdomainExists = async (req: IncomingMessage, res: ServerResponse, next: Next) => {
  const { host = '' } = req.headers;
  const subdomain = getSubdomain(host);

  const org = await getOrganizationByCode(subdomain);

  if (!org) {
    // @ts-ignore
    return res.json(
      {
        errors: [
          {
            code: 'BadSubdomain',
            status: 404,
            title: 'Subdomain does not exist',
            details: `Subdomain of "${subdomain}" does not currently exist.`,
          },
        ],
      },
      404,
    );
  }

  // @ts-ignore
  req.church = org;

  next();
};

export default subdomainExists;
