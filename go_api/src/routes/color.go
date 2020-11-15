package routes

import (
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

// AddColorRoutes adds routes to api related to colors
func AddColorRoutes(routerGroup *gin.RouterGroup) {
	routerGroup.GET("/color/random", getRandomColor)
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
	db.Collection("colors").FindOne(context, bson.D{}).Decode(&result)

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
