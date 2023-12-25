const Book = require('../models/book');

const bookController = {
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  addBook: async (req, res) => {
    try {
      const newBook = await Book.create(req.body);
      res.status(201).json(newBook);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  updateBookAvailability: async (req, res) => {
    try {
      const { id } = req.params;
      const { availabilityStatus } = req.body; // Assuming you pass new availabilityStatus as { "availabilityStatus": true/false }
      
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { currentAvailabilityStatus: availabilityStatus },
        { new: true }
      );

      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }

      res.json(updatedBook);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  removeBook: async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book removed' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = bookController;
