import ordersService from "../services/orders.js";
import HttpError from "../helpers/HttpError.js";

const create = async (req, res) => {
  const result = await ordersService.create(req.body);
  res.status(201).json(result);
};

const getAll = async (req, res) => {
  const result = await ordersService.getAll();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await ordersService.getById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

export default {
  create,
  getAll,
  getById,
};