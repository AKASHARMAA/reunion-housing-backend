const express = require("express");
const propertyController = require("../controllers/propertyController");
const cors = require("cors");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/list-properties", cors(), propertyController.listProperties);
router.get("/property", auth, propertyController.viewProperties);
router.post("/property", auth, propertyController.addProperty);
router.delete("/property/:id", auth, propertyController.deleteProperty);
router.patch("/property/:id", auth, propertyController.updateProperty);

module.exports = router;
