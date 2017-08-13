const createResponse = (success, results, error) => {
  return JSON.stringify({
    success,
    results,
    error,
  });
};

module.exports = createResponse;