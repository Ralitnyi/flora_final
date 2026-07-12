import Order from "../models/order.js";

const create = async (data) => {
  return Order.create(data);
};

const getAll = async () => {
  return Order.findAll({ order: [["id", "DESC"]] });
};

const getById = async (id) => {
  return Order.findByPk(id);
};

export default {
  create,
  getAll,
  getById,
};