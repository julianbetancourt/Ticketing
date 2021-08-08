import { NextFunction, Request, Response } from "express"
import { DatabaseConnectionError } from "../errors/database-connection-error"
import { RequestValidationError } from "../errors/request-validation-error"

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    const formattedError = err.errors.map((error) => {
      return { message: error.msg, field: error.param }
    })

    return res.status(400).send({ errors: formattedError })
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ errors: err.reason })
  }

  res.status(400).send({
    errors: [{ message: "Something went wrong" }],
  })
}
