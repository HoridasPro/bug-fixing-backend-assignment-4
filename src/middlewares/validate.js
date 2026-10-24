// // middleware to validate request bodies against Zod schemas

// const validate = (schema) => (req, res, next) => {
//   try {
//     req.body = schema.parse(req.body);
//     next();
//   } catch (err) {
//     return res.status(400).json({
//       message: "Validation error",
//       errors: err.errors,
//     });
//   }
// };

// module.exports = validate;
const validate = (schema) => (req, res, next) => {
  try {
    const result = schema.parse({
      body: req.body,
    });

    req.body = result.body;
    next();
  } catch (err) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        success: false,
        message: err.issues[0]?.message || "Validation failed",
        errors: err.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    next(err);
  }
};

module.exports = validate;