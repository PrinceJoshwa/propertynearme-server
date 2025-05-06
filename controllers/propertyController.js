import Property from "../models/propertyModel.js"

// Get all properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find({})
    res.json(properties)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}

// Get property by ID
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)

    if (property) {
      res.json(property)
    } else {
      res.status(404).json({ message: "Property not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}

// Create a new property
const createProperty = async (req, res) => {
  try {
    const { title, description, price, location, type, bedrooms, bathrooms, area, features, images } = req.body

    const property = new Property({
      title,
      description,
      price,
      location,
      type,
      bedrooms,
      bathrooms,
      area,
      features,
      images,
      user: req.user._id,
    })

    const createdProperty = await property.save()
    res.status(201).json(createdProperty)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}

// Update a property
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)

    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    // Check if the property belongs to the user
    if (property.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }

    const updatedProperty = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.json(updatedProperty)
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}

// Delete a property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)

    if (!property) {
      return res.status(404).json({ message: "Property not found" })
    }

    // Check if the property belongs to the user
    if (property.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" })
    }

    await Property.findByIdAndDelete(req.params.id)
    res.json({ message: "Property removed" })
  } catch (error) {
    res.status(500).json({ message: "Server Error" })
  }
}

export { getProperties, getPropertyById, createProperty, updateProperty, deleteProperty }

