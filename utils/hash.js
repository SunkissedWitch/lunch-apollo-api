const crypto = require('node:crypto');

const hashPassword = (password) => {
  console.log(process.env)
  const hash = crypto.pbkdf2Sync(password, process.env.SALT, 1000, 64, 'sha512').toString('hex');
  return hash
}

const verifyPassword = (password, salt, hash) => {
  const hashedPassword = crypto.pbkdf2Sync(password, process.env.SALT, 1000, 64, 'sha512').toString('hex');
  return hash === hashedPassword;
}

module.exports = {
  hashPassword,
  verifyPassword,
}