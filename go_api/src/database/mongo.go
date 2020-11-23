package database

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//MongoDb connects to local mongodb instance
func MongoDb(mongoDBUser *string, mongoDBPassword *string, mongoDBURI *string, mongoDB *string) gin.HandlerFunc {
	log.Println("initializing mongo db")

	return func(ctx *gin.Context) {
		client, err := mongo.NewClient(
			options.Client().ApplyURI(
				fmt.Sprintf("mongodb+srv://%s:%s@%s?retryWrites=true&w=majority",
					*mongoDBUser,
					*mongoDBPassword,
					*mongoDBURI,
				)))

		if err != nil {
			log.Fatal(err)
		}

		err = client.Connect(ctx)
		defer client.Disconnect(ctx)

		if err != nil {
			log.Fatal(err)
		}

		ctx.Set("db", client.Database(*mongoDB))
		ctx.Next()
	}
}
