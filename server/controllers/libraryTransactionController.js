// controllers/libraryTransactionController.js
const LibraryTransaction = require("../models/libraryTransaction");
const Book = require("../models/book"); // Import the Book model

const libraryTransactionController = {
  getAllTransactions: async (req, res) => {
    try {
      if (req.user.role === "admin") {
        // If the user is an admin, fetch all transactions
        const transactions = await LibraryTransaction.find().populate('user').populate('book');
        res.json(transactions);
      } else if (req.user.role === "user") {
        // If the user is a regular user, fetch transactions of that particular user
        const transactions = await LibraryTransaction.find({ user: req.user._id }).populate('user').populate('book');
        res.json(transactions);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  createTransaction: async (req, res) => {
    try {
      const { user, book, transactionType } = req.body;
  
      if (transactionType === "borrowed" || transactionType === "approved") {
        // Check if the book is available
        const selectedBook = await Book.findById(book);
        if (!selectedBook || !selectedBook.currentAvailabilityStatus) {
          return res
            .status(400)
            .json({ message: "Book is not available for borrowing" });
        }
  
        const currentDate = new Date();
        const dueDate = new Date(currentDate);
        dueDate.setDate(dueDate.getDate() + 2); // Set due date 2 days from now
  
        // Create a transaction
        const newTransaction = await LibraryTransaction.create({
          user,
          book,
          transactionType,
          dueDate, // Add due date to the transaction
        });
  
        // Set the book's currentAvailabilityStatus to false upon borrowing
        selectedBook.currentAvailabilityStatus = false;
        await selectedBook.save();
  
        res.status(201).json(newTransaction);
      } else if (transactionType === "returned") {
        const borrowedTransaction = await LibraryTransaction.findOne({
          user,
          book,
          transactionType: { $in: ["approved", "borrowed"] },
        });
  
        if (!borrowedTransaction) {
          return res
            .status(400)
            .json({ message: "Book borrowed by the user was not found or approved" });
        }
  
        // Check if the due date is passed
        if (borrowedTransaction.dueDate < new Date()) {
          // Update the book availability to true
          const returnedBook = await Book.findById(book);
          returnedBook.currentAvailabilityStatus = true;
          await returnedBook.save();
  
          // Update transaction status to 'returned'
          borrowedTransaction.transactionType = "returned";
          await borrowedTransaction.save();
          
          return res.json({ message: "Book returned successfully" });
        } else {
          return res
            .status(400)
            .json({ message: "Book cannot be returned before the due date" });
        }
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
    
  approveBookRequest: async (req, res) => {
    try {
      const { transactionId } = req.body;
  
      const transaction = await LibraryTransaction.findById(transactionId);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
  
      if (transaction.transactionType !== "borrowed") {
        return res.status(400).json({ message: "Invalid transaction type" });
      }
  
      transaction.transactionType = "approved";
      await transaction.save();
  
      const borrowedBook = await Book.findById(transaction.book);
      if (!borrowedBook) {
        return res.status(404).json({ message: "Associated book not found" });
      }
  
      borrowedBook.currentAvailabilityStatus = false;
      await borrowedBook.save();
  
      res.json({ message: "Book request approved" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  
  deleteTransaction: async (req, res) => {
    try {
      const transaction = await LibraryTransaction.findByIdAndDelete(
        req.params.id
      );
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.json({ message: "Transaction deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = libraryTransactionController;
