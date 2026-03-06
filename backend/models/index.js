const sequelize = require('../config/db');
const User = require('./User');
const Program = require('./Program');
const Group = require('./Group');
const Student = require('./Student');
const Fee = require('./Fee');
const Payment = require('./Payment');
const Receipt = require('./Receipt');

// Associations
Program.hasMany(Group);
Group.belongsTo(Program);

Program.hasMany(Student);
Student.belongsTo(Program);

Group.hasMany(Student);
Student.belongsTo(Group);

Program.hasMany(Fee);
Fee.belongsTo(Program);

Student.hasMany(Payment);
Payment.belongsTo(Student);

Payment.hasOne(Receipt);
Receipt.belongsTo(Payment);

module.exports = {
  sequelize,
  User,
  Program,
  Group,
  Student,
  Fee,
  Payment,
  Receipt
};
