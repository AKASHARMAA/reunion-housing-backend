const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: false,
    min: 0,
  },
  bathrooms: {
    type: Number,
    required: false,
    min: 0,
  },
  area: {
    type: Number,
    required: true,
    min: 0,
  },
  propertyType: {
    type: String,
    required: true,
  },
  availableFrom: {
    type: Date,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Property", PropertySchema);
