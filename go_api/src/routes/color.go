package routes

import (
	"math/rand"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// AddColorRoutes adds routes to api related to colors
func AddColorRoutes(routerGroup *gin.RouterGroup) {
	routerGroup.GET("/color/:name", getNamedColor)
}

func getRandomColor(context *gin.Context) {
	db := context.MustGet("db").(*mongo.Database)

	result := struct {
		Name       string `json:"name,omitempty"`
		Red        int    `json:"red,omitempty"`
		Green      int    `json:"green,omitempty"`
		Blue       int    `json:"blue,omitempty"`
		Hue        int    `json:"hue,omitempty"`
		Saturation int    `json:"saturation,omitempty"`
		Lightness  int    `json:"lightness,omitempty"`
		Hex        string `json:"hex,omitempty"`
	}{}
	count, _ := db.Collection("colors").CountDocuments(context, bson.D{})

	skipAmount := int64(rand.Intn(int(count)))

	db.Collection("colors").FindOne(context, bson.D{}, &options.FindOneOptions{Skip: &skipAmount}).Decode(&result)

	context.JSON(200, gin.H{
		"name":       result.Name,
		"red":        result.Red,
		"green":      result.Green,
		"blue":       result.Blue,
		"hue":        result.Hue,
		"saturation": result.Saturation,
		"lightness":  result.Lightness,
		"hex":        result.Hex,
	})
}

func getNamedColor(context *gin.Context) {
	name := context.Param("name")
	if name == "random" {
		getRandomColor(context)
		return
	}

	db := context.MustGet("db").(*mongo.Database)

	result := struct {
		Name       string `json:"name,omitempty"`
		Red        int    `json:"red,omitempty"`
		Green      int    `json:"green,omitempty"`
		Blue       int    `json:"blue,omitempty"`
		Hue        int    `json:"hue,omitempty"`
		Saturation int    `json:"saturation,omitempty"`
		Lightness  int    `json:"lightness,omitempty"`
		Hex        string `json:"hex,omitempty"`
	}{}
	query := bson.M{
		"name": name,
	}
	db.Collection("colors").FindOne(context, query).Decode(&result)
	context.JSON(200, gin.H{
		"name":       result.Name,
		"red":        result.Red,
		"green":      result.Green,
		"blue":       result.Blue,
		"hue":        result.Hue,
		"saturation": result.Saturation,
		"lightness":  result.Lightness,
		"hex":        result.Hex,
	})
}
