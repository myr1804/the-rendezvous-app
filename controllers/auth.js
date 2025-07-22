import { Router } from 'express';
const router = Router();
import { hashSync, compareSync } from 'bcrypt';

import User from '../models/user.js';


router.get('/sign-up', (req, res) => {
  console.log("test");
  res.render('auth/sign-up.ejs');
});

router.get('/sign-in', (req, res) => {
  console.log("test");
  res.render('auth/log-in.ejs');
});

router.get('/sign-out', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

router.post('/sign-up', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.send('Username already taken.');
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Password and Confirm Password must match');
    }

    const hashedPassword = hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    await User.create(req.body);

    res.redirect('/auth/sign-in');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.post('/sign-in', async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (!userInDatabase) {
      return res.send('Login failed. Please try again.');
    }
    const validPassword = compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      return res.send('Login failed. Please try again.');
    }

    req.session.user = {
      username: userInDatabase.username,
      _id: userInDatabase._id
    };

    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

export default router;
