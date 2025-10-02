export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (err) {
    const formattedErrors = err.errors?.map(e => ({
      path: e.path?.join('.') || '',
      message: e.message
    })) || [];

    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: formattedErrors
    });
  }
};
