import db from "../models";

const Categories = db.categories;
const Op = db.sequelize.Op;

exports.create = async (req, res) => {
  const newCategories = new Categories({
    name: req.body.name,
    slug: req.body.slug,
    image: req.file.path,
  });

  try {
    const categories = await newCategories.save();
    if (!categories) throw Error("insert data kategori gagal");
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.findAll = async (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  try {
    const categories = await Categories.findAll({
      where: condition,
      include: ["books"],
    });
    if (!categories) throw Error("Buku tidak ada");
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const categories = await Categories.findByPk(id);
    if (!categories) throw Error("Buku tidak ada");
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const updateCategories = {
    name: req.body.name,
    slug: req.body.slug,
    image: req.file.path,
  };

  try {
    const categories = Categories.update(updateCategories, {
      where: { id: id },
    });
    if (!categories) throw Error("gagal update data kategori");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const categories = await Categories.destroy({ where: { id: id } });
    if (!categories) throw Error("gagal mengahpus data kategori");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
