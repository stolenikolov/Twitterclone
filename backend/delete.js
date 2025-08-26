import { sequelize, Post } from './db.js';

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    // Delete all posts
    await Post.destroy({ where: {} });
    console.log('All posts deleted!');

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
