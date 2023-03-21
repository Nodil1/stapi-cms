'use strict';

/**
 * article router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::article.article');

const customRouter = (innerRouter, routeOveride = [], extraRoutes = []) => {
  let routes;

  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes;

      const newRoutes = routes.map((route) => {
        let found = false;

        routeOveride.forEach((overide) => {
          if (
            route.handler === overide.handler &&
            route.method === overide.method
          ) {
            found = overide;
          }
        });

        return found || route;

      });

      return newRoutes.concat(extraRoutes);
    },
  };
};

const myExtraRoutes = [
  {
    method: "GET",
    path: "/articles/:slug/view",
    handler: "article.logView",
  },
  {
    method: "GET",
    path: "/articles/:slug/like",
    handler: "article.logLike",
  }
]

module.exports = customRouter(defaultRouter, [], myExtraRoutes);
