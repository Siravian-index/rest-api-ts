import mongoose from "mongoose"
import { UserDocument } from "./user.model"

import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxz0123456789", 10)

export interface ProductDocument extends mongoose.Document {
  user: UserDocument["_id"]
  title: string
  description: string
  price: number
  image: string
  productId: string
}

const schema = new mongoose.Schema<ProductDocument>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  productId: {
    type: String,
    require: true,
    unique: true,
    default: () => `product_${nanoid()}`
  },
  // TODO: finish this schema
},
  {
    timestamps: true
  }
)

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id
  }
});

const Product = mongoose.model("Product", schema)

export default Product