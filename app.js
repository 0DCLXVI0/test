const config = require("config");
const express = require("express");
const app = express();
const sequelize = require("./db/sequelize");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const swaggerFile = JSON.parse(fs.readFileSync("./swagger/swagger.json"));

app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

sequelize
	.authenticate()
	.then(() => {
		sequelize.sync({ alter: true }).then(() =>
			app.listen(config.get("server.port"), () => {
				console.log("Сервер запущен");
			})
		);
	})
	.catch((e) => console.log(e));
