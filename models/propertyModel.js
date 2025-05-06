import mongoose from "mongoose"

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: String,
    },
    bathrooms: {
      type: String,
    },
    area: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
    },
    images: {
      type: [String],
    },
    status: {
      type: String,
      // default: "For Sale",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Property = mongoose.model("Property", propertySchema)
export default Property

