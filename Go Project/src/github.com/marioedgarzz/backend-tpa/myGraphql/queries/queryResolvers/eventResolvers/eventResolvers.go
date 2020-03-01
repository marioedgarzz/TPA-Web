package eventResolvers

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/models/events"
)

func GetAllEvents(p graphql.ResolveParams) (interface{}, error) {

	return events.GetAllEvents()
}
