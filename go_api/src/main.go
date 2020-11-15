package main

import (
	"fmt"
	"go_api/src/routes"
)

func main() {
	fmt.Println("Server starting")
	routes.Run()
}
