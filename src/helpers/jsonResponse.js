const jsonResponse = (data) => {
  const status = data.status || 500;
  return data.res.status(status).json({
    status,
    ...data,
    res: undefined,
  });
};

module.exports = jsonResponse;
