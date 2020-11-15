package routes

import "github.com/gin-gonic/gin"

// Ping for ping/pong default endpoint
func Ping(context *gin.Context) {
	context.JSON(200, gin.H{
		"message": "pong",
	})
}
