exports.error404 = (req, res, next) => {
    next({ message: 'HTTP 404: Not Found', status: 404 });
  };
  
exports.error500 = (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  };