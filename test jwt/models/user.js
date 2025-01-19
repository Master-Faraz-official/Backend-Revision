const bcrypt = require("bcryptjs")

const users = [] //.    Simulates a database

module.exports = {
    findUserByEmail: (email) => users.find((user) => user.email === email),
  
    addUser: async (email, password) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { id: Date.now(), email, password: hashedPassword };
      users.push(user);
      return user;
    },
  };