const express = require("express");
const teams = require("../Controller/dataController");

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.route("/").get(teams.getAllData).post(teams.createData);
router.route("/update").patch(teams.updateData).delete(teams.deleteData);
router.route("/search").get(teams.getData);

module.exports = router;
