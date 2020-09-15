import data from "../models/city.json";

exports.findAll = async (req, res) => {
  try {
    const cities = await data;
    if (!cities) throw Error("data kota tidak ada");
    res.status(200).json(cities.rajaongkir.results);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
