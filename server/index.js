const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const connectDB = require("./db");
const User = require("./models/user");

require("dotenv").config();

// Connect to MongoDB Atlas
connectDB();

// Passport Configuration
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
        console.log("NOT USER: ", !user);
        console.log("NOT VALID PASS: ", !(await user.validPassword(password)));

      if (!user || !(await user.validPassword(password))) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Use express-session middleware
app.use(
  session({
    secret: "LIBRARYMANAGEMENTSYSTEMBACKEND", // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    // Additional options as needed
  })
);

// Initialize Passport and session support
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS handling
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true"); // Set to 'true' for credential requests
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// Login route using Passport's local strategy
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      // Return user details and success message
      return res
        .status(200)
        .json({ message: "Authentication successful", user });
    });
  })(req, res, next);
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Error logging out' });
      }
      res.status(200).json({ message: "Logout successful" });
      //res.redirect('/login'); // Redirect to login page after logout
    });
  });

  
// Import and use routes
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const libraryTransactionRoutes = require("./routes/libraryTransactionRoutes");

app.use("/books", bookRoutes);
app.use("/users", userRoutes);
app.use("/libraryTransactions", libraryTransactionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
