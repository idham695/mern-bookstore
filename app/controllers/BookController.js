import db from "../models";
const Books = db.books;
const Op = db.sequelize.Op;

exports.findAll = async (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  try {
    const books = await Books.findAll({
      where: condition,
      include: ["categories"],
    });
    if (!books) throw Error("Buku tidak ada");
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.create = async (req, res) => {
  const newBooks = new Books({
    title: req.body.title,
    categoryId: req.body.categoryId,
    slug: req.body.slug,
    description: req.body.description,
    author: req.body.author,
    publisher: req.body.publisher,
    cover: req.file.path,
    price: req.body.price,
    views: 0,
    weight: req.body.weight,
    stock: req.body.stock,
  });

  try {
    const books = await newBooks.save();
    if (!books) throw Error("insert data buku gagal");
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const books = await Books.findByPk(id);
    if (!books) throw Error("Buku tidak ada");
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

  const updateBooks = {
    title: req.body.title,
    slug: req.body.slug,
    description: req.body.description,
    author: req.body.author,
    publisher: req.body.publisher,
    cover: req.file.path,
    price: req.body.price,
    views: 0,
    weight: req.body.weight,
    stock: req.body.stock,
  };

  try {
    const books = Books.update(updateBooks, {
      where: { id: id },
    });
    if (!books) throw Error("gagal update data buku");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const books = await Books.destroy({ where: { id: id } });
    if (!books) throw Error("gagal mengahpus data buku");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
