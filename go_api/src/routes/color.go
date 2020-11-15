package routes

import "github.com/gin-gonic/gin"

// AddColorRoutes adds routes to api related to colors
func AddColorRoutes(routerGroup *gin.RouterGroup) {
	routerGroup.GET("/color", getColor)
}

func getColor(context *gin.Context) {
	context.JSON(200, gin.H{
		"color": "yes",
	})
}
