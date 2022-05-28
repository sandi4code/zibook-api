export default () => ({
  environment: process.env.APP_ENV || 'development',
  port: parseInt(process.env.APP_PORT, 10) || 3001,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    pass: process.env.DB_PASS || 'root',
    name: process.env.DB_NAME || 'jitra',
  },
  jwt_secret: process.env.JWT_SECRET
});