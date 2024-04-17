import mongoose from "mongoose"
import { UserDocument } from "./user.model"

import { customAlphabet } from "nanoid"

const nanoid = customAlphabet("qwertyuiopasfghjklzxcvbnm1234567890", 10)


export interface ProductInput {
  title: string
  description: string
  price: number
  image: string
}
export interface ProductDocument extends ProductInput, mongoose.Document {
  user: UserDocument["_id"]
  productId: string
}

const schema = new mongoose.Schema<ProductDocument>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  productId: {
    type: String,
    require: true,
    unique: true,
    default: () => `product_${nanoid()}`
  },
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