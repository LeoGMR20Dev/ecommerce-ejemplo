const mongoose = require("mongoose");

class TransactionRepository {
  constructor() {
    this.session = null;
  }

  async beginTransaction() {
    this.session = await mongoose.startSession();
    this.session.startTransaction();
  }

  async commitTransaction() {
    if (!this.session) {
      throw new Error("Transaction not started");
    }

    await this.session.commitTransaction();
  }

  async rollbackTransaction() {
    if (!this.session) {
      throw new Error("Transaction not started");
    }

    await this.session.abortTransaction();
  }

  async dispose() {
    if (this.session) {
      this.session.endSession();
      this.session = null;
    }
  }

  async getSession() {
    if (!this.session) {
      throw new Error("Transaction not started");
    }

    return this.session;
  }
}

module.exports = TransactionRepository;
