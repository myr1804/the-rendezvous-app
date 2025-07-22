import express from "express";
const router = express.Router();
import User from '../models/user.js';


router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('applications/index.ejs', {
      events: currentUser.events,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/new', async (req, res) => {
  res.render('applications/new.ejs');
});

router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.events.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});

router.get('/:applicationId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const event = currentUser.events.id(req.params.applicationId);
    res.render('applications/show.ejs', {
      event: event,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.get('/:applicationId/friends', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const friends = currentUser.friends.id(req.params.applicationId);
    res.render('applications/friends.ejs', {
      friends: friends,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.delete('/:applicationId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.events.id(req.params.applicationId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.get('/:applicationId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const event = currentUser.events.id(req.params.applicationId);
    res.render('applications/edit.ejs', {
      event: event,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


router.put('/:applicationId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const event = currentUser.events.id(req.params.applicationId);
    event.set(req.body);
    await currentUser.save();
    res.redirect(
      `/users/${currentUser._id}/applications/${req.params.applicationId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/');
  }
});


export default router;