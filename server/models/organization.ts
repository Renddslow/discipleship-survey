import prisma from '../client';

export const getOrganizationByCode = (churchCode: string) =>
  prisma.church.findUnique({
    where: { churchCode },
    include: {
      denomination: true,
    },
  });
