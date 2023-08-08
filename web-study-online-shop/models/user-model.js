const bcrypt = require(`bcryptjs`);

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

  getUserWithSameEmail() {
    return db.getDb().collection(`users`).findOne({ email: this.email });
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

  comparePassword(hasedPwd){
    return bcrypt.compare(this.password, hasedPwd);
  }
}

module.exports = User;
