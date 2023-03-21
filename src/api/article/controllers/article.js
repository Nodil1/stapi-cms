'use strict';

/**
 *  article controller
 */

const {createCoreController} = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({strapi}) => ({
  async logView(ctx) {
    const {slug} = ctx.params;
    const {query} = ctx;

    if (!query.filters) query.filters = {}
    query.filters.slug = {'$eq': slug}

    const article = await strapi.service('api::article.article').find(query);
    const entry = await strapi.db.query('api::article.article').findOne({
      where: {slug: slug},
    });
    await strapi.db.query('api::article.article').update({
      where: {slug: slug},
      data: {
        views: parseInt(entry.views) + 1,
      },
    });
    return ctx.send({
      success: true,
      ar: entry.views
    });
  },

  async logLike(ctx) {
    const {slug} = ctx.params;
    const {query} = ctx;

    if (!query.filters) query.filters = {}
    query.filters.slug = {'$eq': slug}

    const article = await strapi.service('api::article.article').find(query);
    const entry = await strapi.db.query('api::article.article').findOne({
      where: {slug: slug},
    });
    await strapi.db.query('api::article.article').update({
      where: {slug: slug},
      data: {
        likes: parseInt(entry.likes) + 1,
      },
    });
    return ctx.send({
      success: true,
      ar: entry.likes
    });
  },
}));
