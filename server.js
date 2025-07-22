import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import methodOverride from "method-override";
import session from "express-session";
import morgan from "morgan";
import isSignedIn from './middleware/is-signed-in.js';
import passUserToView from './middleware/user-view.js';
import authController from './controllers/auth.js';
import applicationsController from './controllers/applications.js';
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB')
};
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


connect();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(morgan("dev"));

app.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect(`users/${req.session.user._id}/applications`);
  }
  else {
    res.render('index.ejs', {
    });
  }
});

app.use('/auth', authController);
app.use(isSignedIn);
app.use(passUserToView);
app.use('/users/:userId/applications', applicationsController);

app.listen(3000, () => {
  console.log(`The express app is ready on port ${3000}!`);
});