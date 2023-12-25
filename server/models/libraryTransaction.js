const mongoose = require('mongoose');

const libraryTransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['borrowed', 'approved', 'returned'],
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model('LibraryTransaction', libraryTransactionSchema);
