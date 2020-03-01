package api

import (
	"github.com/gorilla/mux"
	"github.com/marioedgarzz/backend-tpa/middleware"
)

func GetNewRouter() *mux.Router {
	r := mux.NewRouter()
	r.Use(middleware.LogMiddleware)

	return r
}
