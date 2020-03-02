package events

import "github.com/graphql-go/graphql"

var eventType *graphql.Object

type Events struct {
	EventName string
	EventPicture string
	EventLocation string
	EventPrice string
	EventDateFrom string
	EventDateTo string
	EventType string
	EventCity string
	EventDescription string
}

func GetTypes() *graphql.Object {
	if eventType == nil {
		eventType = graphql.NewObject(graphql.ObjectConfig{
			Name:        "EventType",
			Fields:      graphql.Fields{
				"EventId": &graphql.Field{
					Type:  graphql.Int,
				},
				"EventName" : &graphql.Field{
					Type: graphql.String,
				},
				"EventPicture" : &graphql.Field{
					Type: graphql.String,
				},
				"EventLocation" : &graphql.Field{
					Type: graphql.String,
				},
				"EventPrice" : &graphql.Field{
					Type: graphql.Int,
				},
				"EventDateFrom" : &graphql.Field{
					Type: graphql.String,
				},
				"EventDateTo" : &graphql.Field{
					Type: graphql.String,
				},
				"EventType" : &graphql.Field{
					Type: graphql.String,
				},
				"EventAddress" : &graphql.Field{
					Type: graphql.String,
				},
				"EventDescription" : &graphql.Field{
					Type: graphql.String,
				},
				"EventTermsAndCondition" : &graphql.Field{
					Type: graphql.String,
				},
			},
			Description: "Get Event Types",
		})
	}
	return eventType
}

