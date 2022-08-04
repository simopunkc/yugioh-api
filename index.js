require('dotenv').config();
const http = require('http');
const app = require("./server");
const server = http.createServer(app);
server.setTimeout(10 * 60 * 1000);
server.headersTimeout = 11 * 60 * 1000;
server.keepAliveTimeout = 10 * 60 * 1000;
const fs = require('fs').promises;
const { env } = process;
const PORT = env.PORT;
const cacheData = env.PATH_API_CACHE;
const mock = {
  data: [],
  expired: 0
};

(async () => {
  try {
    await fs.readFile(cacheData, 'utf-8');
  } catch (e) {
    await fs.writeFile(cacheData, JSON.stringify(mock));
  }
})();

server.listen(PORT, function listening() {
  console.log('Listening on %d', server.address().port);
});