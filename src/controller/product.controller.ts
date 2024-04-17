

import { Request, Response } from "express";
import logger from "../utils/logger";

export async function createProductHandler(req: Request<{}, {}, {}>, res: Response) {
    try {

    } catch (error) {
        logger.error(error)
        if (error instanceof Error) {
            return res.status(409).send(error.message)
        }
        return res.status(500).send("Internal server error")
    }
}

export async function updateProductHandler(req: Request<{}, {}, {}>, res: Response) {
  try {
    
  } catch (error) {
      logger.error(error)
      if (error instanceof Error) {
          return res.status(409).send(error.message)
      }
      return res.status(500).send("Internal server error")
  }
}

export async function getProductHandler(req: Request<{}, {}, {}>, res: Response) {
  try {
    
  } catch (error) {
      logger.error(error)
      if (error instanceof Error) {
          return res.status(409).send(error.message)
      }
      return res.status(500).send("Internal server error")
  }
}

export async function deleteProductHandler(req: Request<{}, {}, {}>, res: Response) {
  try {
    
  } catch (error) {
      logger.error(error)
      if (error instanceof Error) {
          return res.status(409).send(error.message)
      }
      return res.status(500).send("Internal server error")
  }
}