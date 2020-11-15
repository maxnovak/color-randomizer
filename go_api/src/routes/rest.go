package routes

import (
	"github.com/gin-gonic/gin"
)

// Run starts up rest api with routes
func Run(DBConnection gin.HandlerFunc) {
	router := gin.Default()

	router.GET("/ping", Ping)
	router.Use(DBConnection)
	api := router.Group("/api")
	AddColorRoutes(api)

	router.Run()
}
