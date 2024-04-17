import mongoose from "mongoose"
import { UserDocument } from "./user.model"


export interface ProductInput {
  user: UserDocument["_id"]
  title: string
  description: string
  price: number
  image: string
}
export interface ProductDocument extends ProductInput, mongoose.Document {
  updatedAt: Date
  createdAt: Date
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