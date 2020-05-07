let cache = [];
function caching() {
  return cache.slice(0, 90);
}
function setCache(data) {
  cache = data;
}
// let counter = 0;

// function increment(number) {
//   counter += number;
//   return counter;
// }

module.exports = { caching, setCache };
