package main

import (
	"fmt"
	"github.com/graphql-go/graphql"
	"github.com/graphql-go/handler"
	"github.com/marioedgarzz/backend-tpa/api"
	"github.com/marioedgarzz/backend-tpa/database"
	"github.com/marioedgarzz/backend-tpa/middleware"
	"github.com/marioedgarzz/backend-tpa/models/blogs"
	"github.com/marioedgarzz/backend-tpa/models/car_rental"
	"github.com/marioedgarzz/backend-tpa/models/chats"
	"github.com/marioedgarzz/backend-tpa/models/events"
	"github.com/marioedgarzz/backend-tpa/models/hotels"
	"github.com/marioedgarzz/backend-tpa/models/promo"
	"github.com/marioedgarzz/backend-tpa/models/train"
	"github.com/marioedgarzz/backend-tpa/models/transactions"
	"github.com/marioedgarzz/backend-tpa/myGraphql/mutations"
	"github.com/marioedgarzz/backend-tpa/myGraphql/queries"
	"log"
	"net/http"
)

func initAllDatabase() {
	db, err := database.Connect()

	if err != nil {
		panic("Connect fail")
	}
	train.InitializeClass(db)
	train.InitializePlaces(db)
	train.InitializeTrain(db)
	train.InitializeSchedule(db)

	car_rental.InitCarBrands(db)
	car_rental.InitCarVendor(db)
	car_rental.InitCarModels(db)
	car_rental.InitCars(db)
	car_rental.InitCarRentalPlace(db)
	car_rental.InitCarFromVendors(db)

	transactions.InitTrainTransactions(db)
	transactions.InitCarTransactions(db)

	hotels.InitHotels(db)

	promo.InitPromos(db)

	events.InitEvents(db)

	blogs.InitBlogs(db)

	chats.InitChats(db)
}

func main() {
	initAllDatabase()
	fmt.Println("Migrating database from postgre...")
	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query:    queries.GetRoot(),
		Mutation: mutations.GetRoot(),
	})

	if err != nil {
		panic(err.Error())
	}

	fmt.Println("Database Migrated Successfully")

	hndler := handler.New(&handler.Config{
		Schema:           &schema,
		Pretty:           true,
		GraphiQL:         true,
		Playground:       true,
	})

	corsHandler := middleware.CorsMiddleware(hndler)

	router:= api.GetNewRouter()
	router.Handle("/api",corsHandler)
	log.Fatalln(http.ListenAndServe(":4100",router))
}