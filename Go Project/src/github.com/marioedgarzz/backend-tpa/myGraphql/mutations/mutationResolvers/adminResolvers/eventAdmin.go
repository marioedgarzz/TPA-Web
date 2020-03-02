package adminResolvers

import (
	"github.com/graphql-go/graphql"
	"github.com/marioedgarzz/backend-tpa/models/events"
)

func InsertNewEvent(p graphql.ResolveParams) (interface{}, error) {

	EventName := p.Args["EventName"].(string)
	EventLocation := p.Args["EventLocation"].(string)
	EventType := p.Args["EventType"].(string)
	EventDateFrom := p.Args["EventDateFrom"].(string)
	EventPicture := p.Args["EventPicture"].(string)
	EventDescription := p.Args["EventDescription"].(string)
	EventTermsAndCondition := p.Args["EventTermsAndCondition"].(string)

	return events.InsertNewEvent(EventName,EventLocation,EventType,EventDateFrom,EventPicture,EventDescription,EventTermsAndCondition)
}

func UpdateEvent(p graphql.ResolveParams) (interface{}, error) {

	EventId := p.Args["EventId"].(int)
	EventName := p.Args["EventName"].(string)
	EventLocation := p.Args["EventLocation"].(string)
	EventType := p.Args["EventType"].(string)
	EventDateFrom := p.Args["EventDateFrom"].(string)
	EventPicture := p.Args["EventPicture"].(string)
	EventDescription := p.Args["EventDescription"].(string)
	EventTermsAndCondition := p.Args["EventTermsAndCondition"].(string)

	return events.UpdateEvent(EventId,EventName,EventLocation,EventType,EventDateFrom,EventPicture,EventDescription,EventTermsAndCondition)
}

func DeleteEvent(p graphql.ResolveParams) (interface{},error) {

	EventId := p.Args["EventId"].(int)

	return events.DeleteEvent(EventId)

}
