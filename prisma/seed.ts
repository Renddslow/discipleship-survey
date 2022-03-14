import fs from 'fs/promises';
import path from 'path';
import { globby } from 'globby';
import client from '@prisma/client';
import { fileURLToPath } from 'url';

const { PrismaClient } = client;

const prisma = new PrismaClient();

const getFilesByType = async (type: string) => {
  const files = await globby(`seed-data/**/*.json`, {
    cwd: path.join(path.dirname(fileURLToPath(import.meta.url)), '../'),
  });
  return Promise.all(files.map(async (p: string) => (await fs.readFile(p)).toString()));
};

type DenominationSeed = {
  name: string;
  parent: number;
  Denomination?: DenominationSeed[];
};

const denominations = async () => {
  const seeds: DenominationSeed[] = (await getFilesByType('denomination'))
    .filter((p) => p)
    .map((p) => JSON.parse(p));
  return Promise.all(
    seeds.map(({ name, Denomination, parent }) => {
      const create = {
        name,
      };
      if (Denomination && Denomination.length) {
        // @ts-ignoree
        create.Denomination = {
          create: Denomination,
        };
      }
      if (parent) {
        // @ts-ignore
        create.denominationId = parent;
      }
      return prisma.denomination.upsert({
        where: { name },
        update: {},
        create,
      });
    }),
  );
};

const questions = async () => {};

const main = async () => {
  await denominations();
};

main().finally(async () => {
  await prisma.$disconnect();
});
