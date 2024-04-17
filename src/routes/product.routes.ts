

import { Router } from "express"
import validate from "../middleware/validateResource"

import requiredUser from "../middleware/requiredUser"
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "../schema/product.schema"
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "../controller/product.controller"

const BASE_ROUTE = "/api/products"
const router = Router()

router.post(BASE_ROUTE, [requiredUser, validate(createProductSchema)], createProductHandler)

router.put(BASE_ROUTE, [requiredUser, validate(updateProductSchema)], updateProductHandler)

router.delete(BASE_ROUTE, [requiredUser, validate(deleteProductSchema)], deleteProductHandler)

router.get(BASE_ROUTE, [requiredUser, validate(getProductSchema)], getProductHandler)





export default router
