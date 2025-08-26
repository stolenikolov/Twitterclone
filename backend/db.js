// db.js
import { Sequelize, DataTypes } from 'sequelize';
import 'dotenv/config'; // automatically loads .env

// Connect to database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // or whatever DB you're using
  }
);

// Define User model
const User = sequelize.define('User', {
  username: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
});

const Post = sequelize.define('Post', {
  message: { type: DataTypes.STRING, allowNull: false },
  likes: {type: DataTypes.INTEGER, defaultValue:0},
  comments: {type: DataTypes.INTEGER, defaultValue:0},
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });


// Export as ES module
export { sequelize, User, Post };
