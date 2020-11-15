package routes

import (
	"github.com/gin-gonic/gin"
)

// Run starts up rest api with routes
func Run() {
	router := gin.Default()

	router.GET("/ping", Ping)

	router.Run()
}
