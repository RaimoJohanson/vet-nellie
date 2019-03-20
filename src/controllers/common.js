exports.notfound = () => async (req, res) => {
  const { method, url } = req;
  res.status(404).json({
    error: { message: 'Route not found', code: 404 },
    request: { method, url },
  });
};
