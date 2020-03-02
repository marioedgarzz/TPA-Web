package events

import (
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type Events struct {
	EventId int `gorm:"primary_key;auto_increment"`
	EventName string
	EventPicture string
	EventLocation string
	EventPrice int
	EventDateFrom string
	EventDateTo string
	EventType string
	EventAddress string
	EventDescription string
	EventTermsAndCondition string
}

func InitEvents(db *gorm.DB) {
	db.AutoMigrate(&Events{})

}


func GetAllEvents() ([]Events, error){
	db, err:= database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var events []Events

	db.Find(&events)

	return events, nil
}

func InsertNewEvent(EventName string,EventLocation string, EventCategory string, EventDateFrom string, EventCode string,
	EventCodeDescription string, EventPicture string, EventDescription string, EventTermsAndCondition string) (interface{}, error){

	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var event = Events{
		EventName:              EventName,
		EventPicture:           EventPicture,
		EventLocation:          EventLocation,
		EventPrice:             100000,
		EventDateFrom:          EventDateFrom,
		EventDateTo:            EventDateFrom,
		EventType:              "",
		EventAddress:           "",
		EventDescription:       "",
		EventTermsAndCondition: "",
	}

}
