const fs = require('fs').promises;
const https = require('https');
const randomUseragent = require('random-useragent');
require('dotenv').config();
const { env } = process;

const baseUrl = 'db.ygoprodeck.com';
const endpoint = '/api/v7/cardinfo.php';
const cacheData = env.PATH_API_CACHE;
const agent = new https.Agent({
  keepAlive: true,
  maxSockets: 1,
  keepAliveMsecs: 10000
});

const fetchYugiohApi = () => {
  const options = {
    agent: agent,
    host: baseUrl,
    path: endpoint,
    port: 443,
    method: "GET",
    headers: {
      'User-Agent': randomUseragent.getRandom(),
      'Connection': 'keep-alive'
    }
  };
  return new Promise((resolve, reject) => {
    https.get(options, res => {
      res.setEncoding('utf8');
      const body = [];
      res.on('data', chunk => body.push(chunk));
      res.on('end', () => resolve(JSON.parse(body.join(''))));
    }).on('error', reject);
  });
}

const fetchUncachedApi = async () => {
  const now = await new Date().getTime();
  const expired = 86400000; // 1 day
  let api = await fetchYugiohApi();
  api.expired = now + expired;
  await fs.writeFile(cacheData, JSON.stringify(api));
}

const fetchApi = async () => {
  let api = await fs.readFile(cacheData, 'utf-8');
  api = await JSON.parse(api);
  return api;
}

module.exports = {
  fetchUncachedApi,
  fetchApi
};
