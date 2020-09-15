import data from "../models/province.json";

exports.findAll = async (req, res) => {
  try {
    const province = await data;
    if (!province) throw Error("data provinsi tidak ada");
    res.status(200).json(data.rajaongkir.results);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
