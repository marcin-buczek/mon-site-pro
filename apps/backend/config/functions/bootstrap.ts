'use strict';

import bootstrap from '../../scripts/bootstrap';

export default async ({ strapi }: { strapi: any }) => {
  await bootstrap({ strapi });
};