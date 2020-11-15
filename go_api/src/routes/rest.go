package routes

import (
	"github.com/gin-gonic/gin"
)

// Run starts up rest api with routes
func Run() {
	router := gin.Default()

	router.GET("/ping", Ping)
	api := router.Group("/api")
	AddColorRoutes(api)

	router.Run()
}
