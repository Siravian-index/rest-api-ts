

import { Router } from "express"
import validate from "../middleware/validateResource"

import requiredUser from "../middleware/requiredUser"
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "../schema/product.schema"
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "../controller/product.controller"

const BASE_ROUTE = "/api/products"
const WITH_PRODUCT_ID = `${BASE_ROUTE}/:productId`
const router = Router()

router.post(BASE_ROUTE, [requiredUser, validate(createProductSchema)], createProductHandler)

router.put(WITH_PRODUCT_ID, [requiredUser, validate(updateProductSchema)], updateProductHandler)

router.delete(WITH_PRODUCT_ID, [requiredUser, validate(deleteProductSchema)], deleteProductHandler)

router.get(WITH_PRODUCT_ID, [requiredUser, validate(getProductSchema)], getProductHandler)


export default router
