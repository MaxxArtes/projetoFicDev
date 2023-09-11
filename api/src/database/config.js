
module.exports = {
    dialect: 'postgres',
    username: 'postgres',
    password: '12345678',
    host: process.env.HOST,
    port: process.env.PORT_DB,
    database: process.env.DATABASE,
    logging: false,
};
