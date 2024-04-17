

import z from "zod"

const payload = {
  body: z.object({
    title: z.string({
      required_error: "title is required"
    }).min(4, "title must be at least 4 characters long"),
    image: z.string({
      required_error: "image is required"
    }),
    description: z.string({
      required_error: "description is required"
    }).min(120, "description should be at least 120 characters long")
      .max(1_000, "description should not exceed 1000 characters"),
    price: z.number({
      required_error: "price is required as a numeric value"
    }).min(1, "price should be at least 1")
  }),
}

const params = {
  params: z.object({
    productId: z.string({
      required_error: "productId is required"
    })
  })
}

export const createProductSchema = z.object({
  ...payload
})

export const updateProductSchema = z.object({
  ...payload,
  ...params,
})

export const deleteProductSchema = z.object({
  ...params
})

export const getProductSchema = z.object({
  ...params
})


export type CreateProduct = z.TypeOf<typeof createProductSchema>
export type UpdateProduct = z.TypeOf<typeof updateProductSchema>
export type DeleteProduct = z.TypeOf<typeof deleteProductSchema>
export type GetProduct = z.TypeOf<typeof getProductSchema>
