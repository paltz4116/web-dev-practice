const bcrypt = require(`bcryptjs`);
const mongodb = require(`mongodb`);

const db = require(`../data/database`);

class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  static async findById(userId) {
    const uid = new mongodb.ObjectId(userId);

    return db
      .getDb()
      .collection(`users`)
      .findOne({ _id: uid }, { projection: { password: 0 } });
  }

  getUserWithSameEmail() {
    return db.getDb().collection(`users`).findOne({ email: this.email });
  }

  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();

    if (existingUser) {
      return true;
    }

    return false;
  }

  async signup() {
    const hasedPwd = await bcrypt.hash(this.password, 12);

    await db.getDb().collection(`users`).insertOne({
      email: this.email,
      password: hasedPwd,
      name: this.name,
      address: this.address,
    });
  }

  comparePassword(hasedPwd) {
    return bcrypt.compare(this.password, hasedPwd);
  }
}

module.exports = User;
