const axios = require("axios");
const fs = require('fs').promises;
const https = require('https');

const baseUrl = 'https://db.ygoprodeck.com/';
const endpoint = 'api/v7/cardinfo.php';
const cacheData = './models/yugioh.model.json';

const yugioh = (parameters) => {
  return axios.create({
    baseURL: baseUrl,
    params: parameters,
    timeout: 0,
    maxContentLength: 900000000,
    maxBodyLength: 9000000000,
    httpsAgent: new https.Agent({ keepAlive: true }),
  });
}

const initModel = async () => {
  let model = {};
  try {
    model = await fs.readFile(cacheData, 'utf-8');
    model = JSON.parse(model);
  } catch (e) {
    await fs.writeFile(cacheData, "[]");
  }
  return model;
}

const fetchApi = async () => {
  let api
  try {
    api = await initModel();
    const now = new Date().getTime();
    const expired = 86400000; // 1 day
    if (!api.expired || api.expired < now) {
      const apiGet = await yugioh({});
      api = await apiGet.get(endpoint);
      if (api.status == 200) {
        api = api.data;
        api.expired = now + expired;
        await fs.writeFile(cacheData, JSON.stringify(api));
      }
    }
  } catch (e) {
    console.log(e.message)
  }
  return api;
}

module.exports = {
  fetchApi
};
