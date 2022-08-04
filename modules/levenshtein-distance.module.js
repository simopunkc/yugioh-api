const LevenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const maxInput = Math.max(a.length, b.length);
  let matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          Math.min(
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        );
      }
    }
  }
  return 1 - (matrix[b.length][a.length] / maxInput);
};

const checkSimilarity = (q, title) => {
  const splitQuery = q.split(' ');
  const splitName = title.split(' ');
  let similarity = 0;
  for (const query of splitQuery) {
    for (const name of splitName) {
      if (LevenshteinDistance(query, name) > 0.75) {
        similarity++;
        break;
      }
    }
    if (similarity > 0) break;
  }
  return similarity;
}

module.exports = {
  checkSimilarity,
};