module.exports = {
    "type": "mysql",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE_NAME,
    "synchronize": true,
    "logging": false,
    "migrations": [
       process.env.PATH_MIGRATION
    ],
    "entities": [
       process.env.PATH_ENTITIES
    ],
    "cli": {
        "migrationsDir": process.env.PATH_MIGRATION_DIR
    }
}