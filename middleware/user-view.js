const userView = (req, res, next) => {
  res.locals.user = req.session.user ? req.session.user : null;
  next();
};

export default userView;