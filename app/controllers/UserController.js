import Role from "../middleware/Role";
import db from "../models/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config/auth";

const User = db.users;
exports.create = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role: Role.User,
    phone: req.body.phone,
    address: req.body.address,
    avatar: req.file.path,
  });

  try {
    const searchUser = await User.findOne({ where: { email: req.body.email } });
    if (searchUser) throw Error("email telah terdaftar");
    const user = await newUser.save();
    if (!user) throw Error("gagal input data user");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) throw Error("user tdak terdaftar");
    const passwordValid = await bcrypt.hashSync(
      req.body.password,
      user.password
    );
    if (!passwordValid) throw Error("password salah");
    var token = await jwt.sign(
      { id: user.id, role: user.role },
      config.secret,
      {
        expiresIn: 86400,
      }
    );
    res.status(200).json({
      status: "success",
      message: "Login sukses",
      data: {
        user,
        accessToken: token,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const user = await User.findAll();
    if (!user) throw Error("data user tidak ada");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
