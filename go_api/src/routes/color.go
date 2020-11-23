package routes

import (
	"log"
	"math/rand"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// RGB is the subdocument for red, green, and blue colors
type RGB struct {
	Red   int `bson:"red,omitempty"`
	Green int `bson:"green,omitempty"`
	Blue  int `bson:"blue,omitempty"`
}

// HSL is the subdocument for hue, saturation, & lightness colors
type HSL struct {
	Hue        float64 `bson:"hue,omitempty"`
	Saturation float64 `bson:"saturation,omitempty"`
	Lightness  float64 `bson:"lightness,omitempty"`
}

// Color is the document shape for the mongodb
type Color struct {
	Name string `bson:"name,omitempty"`
	HSL  HSL    `bson:"hsl,omitempty"`
	RGB  RGB    `bson:"rgb,omitempty" `
	Hex  string `bson:"hex,omitempty"`
}

// AddColorRoutes adds routes to api related to colors
func AddColorRoutes(routerGroup *gin.RouterGroup) {
	routerGroup.GET(("/color/"), getAllColors)
	routerGroup.GET("/color/:name", getNamedColor)
	routerGroup.POST("/color/", addNewColor)
}

func getRandomColor(context *gin.Context) {
	db := context.MustGet("db").(*mongo.Database)

	result := Color{}
	count, _ := db.Collection("colors").CountDocuments(context, bson.D{})

	skipAmount := int64(rand.Intn(int(count)))

	db.Collection("colors").FindOne(context, bson.D{}, &options.FindOneOptions{Skip: &skipAmount}).Decode(&result)

	context.JSON(200, gin.H{
		"name":       result.Name,
		"red":        result.RGB.Red,
		"green":      result.RGB.Green,
		"blue":       result.RGB.Blue,
		"hue":        result.HSL.Hue,
		"saturation": result.HSL.Saturation,
		"lightness":  result.HSL.Lightness,
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

	result := Color{}
	query := bson.M{
		"name": name,
	}
	db.Collection("colors").FindOne(context, query).Decode(&result)
	context.JSON(200, gin.H{
		"name":       result.Name,
		"red":        result.RGB.Red,
		"green":      result.RGB.Green,
		"blue":       result.RGB.Blue,
		"hue":        result.HSL.Hue,
		"saturation": result.HSL.Saturation,
		"lightness":  result.HSL.Lightness,
		"hex":        result.Hex,
	})
}

func getAllColors(context *gin.Context) {
	db := context.MustGet("db").(*mongo.Database)
	result := []Color{}

	cursor, err := db.Collection("colors").Find(context, bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	err = cursor.All(context, &result)
	if err != nil {
		log.Fatal(err)
	}

	context.JSON(200,
		result,
	)
}

func addNewColor(context *gin.Context) {
	db := context.MustGet("db").(*mongo.Database)
	var data Color
	err := context.BindJSON(&data)
	if err != nil {
		log.Fatal(err)
	}
	insertResult, err := db.Collection("colors").InsertOne(context, data)

	if err != nil {
		log.Fatal(err)
	}
	log.Println("Inserted new color with ID: ", insertResult.InsertedID)
}
