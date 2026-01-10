const AsyncHandler = (reqFunc) => {
  return (req, res, next) => {
    Promise.resolve(reqFunc(req, res, next)).catch((err) => next(err));
  };
};

export { AsyncHandler };
