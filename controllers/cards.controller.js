require('dotenv').config();
const { fetchUncachedApi, fetchApi } = require('../apis/yugioh');
const { getOffset } = require('../modules/pagination.module');
const { checkSimilarity } = require('../modules/levenshtein-distance.module');

const updateCacheCards = async (_, res) => {
  try {
    await fetchUncachedApi();
    return res.status(200).json({
      status: true,
      message: `cache has been successfully updated`
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    })
  }
}

const getListCards = async (req, res) => {
  const { page } = req.params;
  try {
    const fetchedData = await fetchApi();
    let pagination = getOffset(page);
    const fetchedArt = []
    fetchedData.data.forEach((v, i) => {
      if (i >= pagination.start && i < pagination.last) {
        fetchedArt.push({
          id: v.id,
          name: v.name,
          type: v.type,
          desc: v.desc,
          card_images: v.card_images,
        });
      } else {
        return
      }
    });
    return res.status(200).json({
      status: true,
      message: `get list of all cards on page ${page}`,
      total: fetchedArt.length,
      data: fetchedArt,
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    })
  }
}

const getListSearchCards = async (req, res) => {
  try {
    const { query } = req.params;
    const fetchedData = await fetchApi();
    let count = 0;
    let fetchedCard = []
    for (const v of fetchedData.data) {
      let similarity = checkSimilarity(query.toLowerCase(), v.name.toLowerCase());
      if (similarity > 0) {
        count++;
        fetchedCard.push({
          id: v.id,
          name: v.name,
          type: v.type,
          desc: v.desc,
          card_images: v.card_images,
        });
      }
      let pagination = getOffset(1);
      if (count >= pagination.last) {
        break
      }
    }
    return res.status(200).json({
      status: true,
      message: `search for cards with query ${query}`,
      total: fetchedCard.length,
      data: fetchedCard,
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    })
  }
}

const getSingleCard = async (req, res) => {
  try {
    const { id } = req.params;
    const fetchedData = await fetchApi();
    let fetchedCard = fetchedData.data.filter((v) => v.id === parseInt(id));
    if (fetchedCard.length > 0) {
      let fetchedSingleCard = []
      for (const v of fetchedCard) {
        fetchedSingleCard.push({
          id: v.id,
          name: v.name,
          type: v.type,
          desc: v.desc,
          card_images: v.card_images,
        });
      }
      return res.status(200).json({
        status: true,
        message: 'get single movie',
        data: fetchedSingleCard,
      })
    } else {
      return res.status(404).json({
        status: false,
        message: 'movie not found',
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      error: error.message,
    })
  }
}

module.exports = {
  updateCacheCards,
  getListCards,
  getListSearchCards,
  getSingleCard,
}