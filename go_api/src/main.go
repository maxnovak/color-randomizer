package main

import (
	"flag"
	"fmt"
	"go_api/src/database"
	"go_api/src/routes"
	"os"
)

func main() {

	var (
		mongoDBUser = flag.String(
			"mongo_db_user",
			os.Getenv("MONGODB_USER"),
			"user for making DB queries",
		)
		mongoDBPassword = flag.String(
			"mongo_db_password",
			os.Getenv("MONGODB_PASSWORD"),
			"password for DB connection",
		)
		mongoDBURI = flag.String(
			"mongo_db_uri",
			os.Getenv("MONGODB_URI"),
			"URI for connecting to DB",
		)
		mongoDB = flag.String(
			"mongo_db",
			os.Getenv("MONGODB"),
			"Database name",
		)
	)
	DBConnection := database.MongoDb(mongoDBUser, mongoDBPassword, mongoDBURI, mongoDB)
	fmt.Println("Server starting")
	routes.Run(DBConnection)
}
