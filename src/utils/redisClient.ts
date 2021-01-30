import redis from 'async-redis';

const host = process.env.REDIS_ENDPOINT;
const portRaw = process.env.REDIS_PORT;
const password = process.env.REDIS_PASSWORD;

if (!host) throw new Error('REDIS_ENDPOINT required');
if (!portRaw) throw new Error('REDIS_PORT required');
if (!password) throw new Error('REDIS_PASSWORD required');

const port = parseInt(portRaw, 10);

const client = redis.createClient({
  port,
  host,
  password,
  tls: {},
});

client.on('error', (err) => {
  throw err;
});

export default client;
