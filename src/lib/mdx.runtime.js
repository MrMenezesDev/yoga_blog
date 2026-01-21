// Conditional export based on build target
// For Cloudflare: uses JSON cache
// For other platforms: uses filesystem

const isCloudflare = process.env.CLOUDFLARE_BUILD === 'true';

if (isCloudflare) {
  module.exports = require('./mdx.cloudflare');
} else {
  module.exports = require('./mdx');
}
