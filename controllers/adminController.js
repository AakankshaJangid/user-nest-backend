const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

// Register a admin

const registerAdmin = asyncHandler(async (req, res) => {
  const {
    adminName,
    email,
    password,
    phone,
    gender,
    howDidYouHearAboutThis,
    city,
    state,
  } = req.body;
  if (
    !adminName ||
    !email ||
    !password ||
    !phone ||
    !howDidYouHearAboutThis ||
    !city ||
    !state
  ) {
    res.status(400);
    throw new Error("Please fill all fields");
  }
  const adminAvailable = await Admin.findOne({ email });
  if (adminAvailable) {
    res.status(400);
    throw new Error("admin already exists");
  }

  //Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashes password : ", hashedPassword);

  const admin = await Admin.create({
    adminName,
    email,
    password: hashedPassword,
    phone,
    gender,
    howDidYouHearAboutThis,
    city,
    state,
  });

  console.log(`admin created ${admin}`);
  if (admin) {
    res
      .status(201)
      .json({
        _id: admin.id,
        email: admin.email,
        phone: phone,
        gender: gender,
        howDidYouHearAboutThis: howDidYouHearAboutThis,
        city: city,
        state: state,
      });
  } else {
    res.status(400).json({ error: 'Registration failed. Please try again.' });
    throw new Error("admin data is not valid");
  }
});

//Login admin

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const admin = await Admin.findOne({ email });
  //compare password with hashedpassword
  if (admin && (await bcrypt.compare(password, admin.password))) {
    const accessToken = jwt.sign(
      {
        admin: {
          adminName: admin.adminName,
          email: admin.email,
          id: admin.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

//Current admin

const currentAdmin = asyncHandler(async (req, res) => {
  res.json(req.admin);
});

module.exports = { registerAdmin, loginAdmin, currentAdmin };
