import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passport from "passport";
import axios from "axios";

const router = express.Router();

router.get(
  "/google/callback",
  passport.authenticate("google", {
    // successRedirect: 'http://localhost:3000/',
    successRedirect: 'https://vendor-management-service.onrender.com/',
    failureRedirect: `https://vendor-management-service.onrender.com/login/failed`,
  })
);

router.get("/google", async (req, res) => {
  try {
    const resp = await axios.get(
      "https://accounts.google.com/o/oauth2/v2/auth",
      {
        params: req.query,
      }
    );
    console.log(resp);
    res.send(resp);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/login/success", async (req, res) => {
    console.log(req.user)
    if (req.user) {
      const existingUser = await User.findOne({ email: req.user._json.email });
      if (existingUser) {
        const payload = { uid: existingUser.uid };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "12h",
        });
        res.cookie('token', token);
        return res.status(200).json({ token });
      } else {
        const newUser = new User({
            name: req.user._json.name,
            email: req.user._json.email,
            profile_pic: req.user._json.picture,
            password: Date.now(),
          });
                 
          const payload = { uid: newUser.uid };
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "12h",
          });
          
          await newUser.save();
          res.cookie('token', token);
          return res.status(200).json({
            user: { ...req.user },
            message: 'Logged In successfully',
            uid: newUser.uid,
            token: token 
          });
          
      }
    } else {
      res.status(403).json({ 'message': 'Not Authorized !' })
      }
});

router.get('/login/failed', (req, res) => {
  res.status(401).json({ 'Error': 'Login failed!' })
});

export default router;
