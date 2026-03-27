// ======================= REQUEST VALIDATION ==============================

/**
 * Middleware generico para validar `req.body` con un schema de Zod.
 * Si la validacion falla, responde con `400 Bad Request`.
 * Si la validacion sale bien, reemplaza `req.body` por la version validada.
 *
 * @VALIDATION | validateRequest
 *
 */

const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const flatError = result.error.issues.map((issue) => issue.message);

      return res.status(400).json({
        message: flatError.join(", "),
      });
    }

    // Reemplazamos el body por el resultado validado y transformado por Zod.
    req.body = result.data;

    next();
  };
};

export { validateRequest };
