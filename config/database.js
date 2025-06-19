import dotenv from 'dotenv';
dotenv.config();

export const MYSQL_CONFIG = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'recipe_app',
  port: process.env.MYSQL_PORT || 3306,
}; 