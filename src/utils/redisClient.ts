import Redis from 'ioredis';

const host = process.env.REDIS_ENDPOINT;
const portRaw = process.env.REDIS_PORT;
const password = process.env.REDIS_PASSWORD;

if (!host) throw new Error('REDIS_ENDPOINT required');
if (!portRaw) throw new Error('REDIS_PORT required');
if (!password) throw new Error('REDIS_PASSWORD required');

const port = parseInt(portRaw, 10);

const redis = new Redis({
  port,
  host,
  password,
  tls: {},
});

redis.on('error', (error) => {
  // Non-critical, just log for now
  console.error(`Redis connection error - ${error.message}`);
});

export default redis;
