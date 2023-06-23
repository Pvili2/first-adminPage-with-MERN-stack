const Teams = require("../Model/dataModell");

const getAllData = async (req, res) => {
  let allData = Teams.find();

  if (!req.query.limit) {
    allData = allData.limit(10);
  } else {
    allData = allData.limit(req.query.limit)
  }

  const data = await allData;
  res.status(200).json({ data });
};

const createData = async (req, res) => {
  try {
    const createdData = await Teams.create(req.body);
    res.status(201).json({ status: "Data created", data: createdData });
  } catch (error) {
    res
      .status(401)
      .json({ status: "Data creation error", error: error.message });
  }
};
const updateData = async (req, res) => {
  try {
    const updatedData = await Teams.findOneAndUpdate({ "_id": req.body["_id"] }, req.body.data);
    res.status(200).json({ status: "Data updated", data: updatedData });
  } catch (error) {
    res.status(404).json({
      status: "Data update error or id not found",
      error: error.message,
    });
  }
};
const deleteData = async (req, res) => {
  try {
    await Teams.findByIdAndDelete(req.params.id, req.body);
    res.status(501).json({ status: "Data deleted" });
  } catch (error) {
    res.status(404).json({
      status: "Data delete error or id not found",
      error: error.message,
    });
  }
};
const getData = async (req, res) => {
  try {
    const data = await Teams.find(req.query);
    console.log(req.query);
    res.status(200).json({ status: "Data founded", data: data });
  } catch (error) {
    res.status(404).json({
      status: "Data not found",
      error: error.message,
    });
  }
};
module.exports = {
  getAllData,
  createData,
  updateData,
  deleteData,
  getData,
};
//99cPATtFWFGOgx1g
