const Property = require("../models/Property");
const User = require("../models/User");

// api/list-properties
exports.listProperties = async (req, res) => {
  try {
    // write your database fetching logic here
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// api/property
exports.addProperty = async (req, res) => {
  try {
    // write your database fetching logic here
    const {
      propertyName,
      price,
      currency,
      city,
      state,
      bedrooms,
      bathrooms,
      area,
      propertyType,
      availableFrom,
      imageUrl,
    } = req.body;

    let owner = await User.findById(req.user.id);

    let property = new Property({
      propertyName,
      price,
      currency,
      city,
      state,
      bedrooms,
      bathrooms,
      area,
      propertyType,
      availableFrom,
      imageUrl,
      owner,
    });

    owner.properties.push(property._id);

    await property.save();
    await owner.save();

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// api/property/:id
exports.updateProperty = async (req, res) => {
  try {
    // write your database fetching logic here
    let property;
    try {
      property = await Property.findById(req.params.id);
    } catch (err) {
      console.log(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Property not found" });
      }
    }

    const user = await User.findById(req.user.id);
    if (!user.properties.includes(req.params.id)) {
      res.status(404).json({ msg: "Incorrect property id" });
      return;
    }

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    // Create a new object with only the properties that exist in req.body
    let updates = {};
    for (let prop in req.body) {
      updates[prop] = req.body[prop];
    }

    property = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// api/property/:id
exports.deleteProperty = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user.properties.includes(req.params.id)) {
      res.status(404).json({ msg: "Incorrect property id" });
      return;
    }

    // write your database fetching logic here
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    await Property.findByIdAndRemove(req.params.id);

    user.properties.pull(req.params.id);
    await user.save();

    res.status(200).send("Deleted Succesfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// api/property
exports.viewProperties = async (req, res) => {
  try {
    // write your database fetching logic here
    const user = await User.findById(req.user.id);

    const properties = await Property.find({ _id: { $in: user.properties } });
    return res.status(200).json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
