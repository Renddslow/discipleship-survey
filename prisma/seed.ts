import fs from 'fs/promises';
import path from 'path';
import { globby } from 'globby';
import client from '@prisma/client';
import { fileURLToPath } from 'url';
import Papa from 'papaparse';
import pSeries from 'p-series';
import crypto from 'crypto';

// @ts-ignore
const { PrismaClient } = client;

const prisma = new PrismaClient();

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

const getFilesByType = async (type: string) => {
  const files = await globby(`seed-data/**/*.json`, {
    cwd: path.join(DIRNAME, '../'),
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

type Parent = {
  connect: {
    id: number;
  };
};

const categories = async () => {
  const raw = await fs.readFile(path.join(DIRNAME, '../', 'seed-data/categories.csv'));
  const data = Papa.parse<{
    id: number;
    name: string;
    parent?: number;
  }>(raw.toString().trim(), {
    header: true,
    transform: (v: string, field: string) => {
      if (field === 'id' || field === 'parent') return parseInt(v, 10);
      return v;
    },
  });
  await pSeries(
    data.data.map((category) => () => {
      const payload: { label: string; parent?: Parent } = {
        label: category.name,
      };
      if (category.parent) {
        payload.parent = {
          connect: {
            id: category.parent,
          },
        };
      }
      return prisma.questionCategory.upsert({
        where: { id: category.id },
        update: {},
        // @ts-ignore
        create: payload,
      });
    }),
  );
};

const questions = async () => {
  const raw = await fs.readFile(path.join(DIRNAME, '../', 'seed-data/questions.csv'));
  const data = Papa.parse<{
    label: string;
    type: string;
    sequence: number | null;
    category: number;
  }>(raw.toString().trim(), {
    header: true,
    transform: (v: string, field: string) => (field === 'category' ? parseInt(v, 10) : v),
  });
  await pSeries(
    data.data.map((question) => () => {
      const { sequence, ...q } = question;
      const hash = crypto.createHash('md5').update(JSON.stringify(q)).digest('hex');
      return prisma.question.upsert({
        where: { shortcode: hash },
        update: {},
        create: {
          label: question.label,
          shortcode: hash,
          type: question.type,
          category: {
            connect: {
              id: question.category,
            },
          },
        },
      });
    }),
  );
};

const main = async () => {
  await denominations();
  await categories();
  await questions();
};

main().finally(async () => {
  await prisma.$disconnect();
});
