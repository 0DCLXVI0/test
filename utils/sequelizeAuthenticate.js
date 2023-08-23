const sequelize = require("../db/sequelize");

const sequelizeAuthenticate = () => sequelize
    .authenticate()
    .then(() => {
        sequelize.sync({ alter: true }).then(() =>
            app.listen(config.get("server.port"), () => {
                console.log("Сервер запущен");
            })
        );
    })
    .catch((e) => console.log(e));

module.exports = sequelizeAuthenticate