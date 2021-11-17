const dotenv = require("dotenv");

dotenv.config();

// const config = {
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   server: process.env.SERVER,
//   database: process.env.DATABASE,
//   options: {
//     trustedConnection: true,
//     enableArithPort: true,
//     instancename: process.env.INSTANCENAME,
//     trustServerCertificate: true,
//   },
//   port: process.env.PORT,
// };

const config = {
  user: "baezl",
  password: "12345678",
  server: "localhost",
  database: "Todo",
  options: {
    trustedConnection: true,
    enableArithPort: true,
    instancename: "DESKTOP-QP0E39V",
    trustServerCertificate: true,
  },
  port: 1433,
};

module.exports = config;
