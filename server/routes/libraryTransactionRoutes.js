const express = require('express');
const router = express.Router();
const libraryTransactionController = require('../controllers/libraryTransactionController');

function authenticateUser(req, res, next) {
    // Check if user is authenticated
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(401).json({ message: 'Authentication required' });
    }
  }
  
  function authorizeUser(role) {
    return function(req, res, next) {
      // Check if the authenticated user has the required role
      if (req.user && req.user.role === role) {
        return next();
      } else {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }
    };
  }  

// Get all transactions (accessible by both admin(for all users) and user(for the particular user))
router.get('/', authenticateUser, libraryTransactionController.getAllTransactions);

// Create a book request (borrow) - accessible only by users
router.post('/requestBook', authenticateUser, authorizeUser('user'), libraryTransactionController.createTransaction);

// Approve a book request (admin only)
router.put('/approveBookRequest', authenticateUser, authorizeUser('admin'), libraryTransactionController.approveBookRequest);

// Return a book (accessible only by users)
router.put('/returnBook', authenticateUser, authorizeUser('user'), libraryTransactionController.createTransaction);

// Delete a transaction (accessible only by admins)
router.delete('/:id', authenticateUser, authorizeUser('admin'), libraryTransactionController.deleteTransaction);

module.exports = router;
