
module.exports.session = {
  secret: '58073aeeeebc2497b1b3a99ddbc967ac',
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 * 14, // cookie保留14天
  },
  adapter: 'redis',
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  pass: process.env.REDIS_PASSWD || '',
  ttl: 24 * 60 * 60 * 14,
  db: process.env.REDIS_DB || 1,
  prefix: 'sscc_sess:',
};
