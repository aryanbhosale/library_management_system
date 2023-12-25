const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

const isLoggedIn = (req, res, next) => {
    if (req.user) {
      // User is logged in, allow access
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized: Please log in' });
    }
  };
  
  const hasPermission = (roles) => {
    return (req, res, next) => {
      if (roles.includes(req.user.role)) {
        // User has the required role, allow access
        next();
      } else {
        return res.status(403).json({ message: 'Access Denied' });
      }
    };
  };

// Routes requiring authentication and appropriate role
router.get('/', isLoggedIn, bookController.getAllBooks); // Accessible to all logged-in users
router.post('/', isLoggedIn, hasPermission(['admin']), bookController.addBook); // Accessible only to 'admin' role
router.put('/:id', isLoggedIn, hasPermission(['admin']), bookController.updateBookAvailability); // Accessible only to 'admin' role
router.delete('/:id', isLoggedIn, hasPermission(['admin']), bookController.removeBook); // Accessible only to 'admin' role

module.exports = router;
