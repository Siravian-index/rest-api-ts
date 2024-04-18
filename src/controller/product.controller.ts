

import { Request, Response } from "express";
import logger from "../utils/logger";
import { CreateProduct, UpdateProduct } from "../schema/product.schema";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../service/product.service";
import { ResourceNotFound, CustomError, ForbiddenError } from "../errors";
import { InternalServerError } from "../errors/InternalServeError";

export async function createProductHandler(req: Request<{}, {}, CreateProduct["body"]>, res: Response) {
  try {
    const userId = res.locals.user.id
    const payload = {
      ...req.body,
      user: userId
    }
    const product = await createProduct(payload)
    return res.send(product)
  } catch (error) {
    logger.error(error)
    if (error instanceof CustomError) {
      return res.status(error.getStatus()).send(error.serialize())
    }
    const e = new InternalServerError()
    return res.status(e.getStatus()).send(e.serialize())
  }
}

export async function updateProductHandler(req: Request<UpdateProduct["params"], {}, UpdateProduct["body"]>, res: Response) {
  try {
    const userId = res.locals.user.id
    const productId = req.params.productId
    const update = req.body

    const product = await findProduct({ _id: productId })
    if (!product) {
      throw new ResourceNotFound(`Could not find product by id: ${productId}`)
    }

    if (String(product.user) !== userId) {
      throw new ForbiddenError(`User: ${userId} is not the owner/creator of this product`)
    }

    const updated = await findAndUpdateProduct({ _id: productId }, update, { new: true })

    return res.send(updated)
  } catch (error) {
    logger.error(error)
    if (error instanceof CustomError) {
      return res.status(error.getStatus()).send(error.serialize())
    }
    const e = new InternalServerError()
    return res.status(e.getStatus()).send(e.serialize())
  }
}

export async function getProductHandler(req: Request<UpdateProduct["params"]>, res: Response) {
  try {
    const productId = req.params.productId
    const product = await findProduct({ _id: productId })
    if (!product) {
      throw new ResourceNotFound(`Could not find product by id: ${productId}`)
    }

    return res.send(product)

  } catch (error) {
    logger.error(error)
    if (error instanceof CustomError) {
      return res.status(error.getStatus()).send(error.serialize())
    }
    const e = new InternalServerError()
    return res.status(e.getStatus()).send(e.serialize())
  }
}

export async function deleteProductHandler(req: Request<UpdateProduct["params"]>, res: Response) {
  try {
    const userId = res.locals.user.id
    const productId = req.params.productId

    const product = await findProduct({ _id: productId })
    if (!product) {
      throw new ResourceNotFound(`Could not find product by id: ${productId}`)
    }

    if (String(product.user) !== userId) {
      throw new ForbiddenError(`User: ${userId} is not the owner/creator of this product`)
    }

    await deleteProduct({ _id: productId })

    return res.sendStatus(200)
  } catch (error) {
    logger.error(error)
    if (error instanceof CustomError) {
      return res.status(error.getStatus()).send(error.serialize())
    }
    const e = new InternalServerError()
    return res.status(e.getStatus()).send(e.serialize())
  }
}