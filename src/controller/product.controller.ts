

import { Request, Response } from "express";
import logger from "../utils/logger";
import { CreateProduct, UpdateProduct } from "../schema/product.schema";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../service/product.service";

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
    if (error instanceof Error) {
      return res.status(400).send(error.message)
    }
    return res.status(500).send("Internal server error")
  }
}

export async function updateProductHandler(req: Request<UpdateProduct["params"], {}, UpdateProduct["body"]>, res: Response) {
  try {
    const userId = res.locals.user.id
    const productId = req.params.productId
    const update = req.body

    const product = await findProduct({ _id: productId })
    if (!product) {
      return res.sendStatus(404)
    }

    if (!String(product.user) !== userId) {
      return res.sendStatus(403)
    }

    const updated = await findAndUpdateProduct({ _id: productId }, update, { new: true })

    return res.send(updated)

  } catch (error) {
    logger.error(error)
    if (error instanceof Error) {
      return res.status(400).send(error.message)
    }
    return res.status(500).send("Internal server error")
  }
}

export async function getProductHandler(req: Request<UpdateProduct["params"]>, res: Response) {
  try {
    // const userId = res.locals.user.id
    const productId = req.params.productId
    const product = await findProduct({ _id: productId })
    if (!product) {
      return res.sendStatus(404)
    }

    return res.send(product)

  } catch (error) {
    logger.error(error)
    if (error instanceof Error) {
      return res.status(400).send(error.message)
    }
    return res.status(500).send("Internal server error")
  }
}

export async function deleteProductHandler(req: Request<UpdateProduct["params"]>, res: Response) {
  try {
    const userId = res.locals.user.id
    const productId = req.params.productId

    const product = await findProduct({ _id: productId })
    if (!product) {
      return res.sendStatus(404)
    }

    if (!String(product.user) === userId) {
      return res.sendStatus(403)
    }

    await deleteProduct({ _id: productId })

    return res.sendStatus(200)
  } catch (error) {
    logger.error(error)
    if (error instanceof Error) {
      return res.status(400).send(error.message)
    }
    return res.status(500).send("Internal server error")
  }
}