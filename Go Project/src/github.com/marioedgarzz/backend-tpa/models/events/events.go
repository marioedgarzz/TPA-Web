package events

import (
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
	"time"
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

func InsertNewEvent(EventName string,EventLocation string, EventCategory string, EventDateFrom string,
	EventPicture string, EventDescription string, EventTermsAndCondition string) (*Events, error){

	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	if len(EventName) > 100 {
		return nil, nil
	}

	var event = Events{
		EventName:              EventName,
		EventPicture:           EventPicture,
		EventLocation:          EventLocation,
		EventPrice:             100000,
		EventDateFrom:          EventDateFrom,
		EventDateTo:            EventDateFrom,
		EventType:              EventCategory,
		EventAddress:           "Jl. Insert",
		EventDescription:       EventDescription,
		EventTermsAndCondition: EventTermsAndCondition,
	}

	db.Create(&event)

	return &event,nil
}

func UpdateEvent(EventId int,EventName string,EventLocation string, EventCategory string, EventDateFrom string,
	EventPicture string, EventDescription string, EventTermsAndCondition string) ([]Events, error) {

	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var events []Events

	db.Model(&events).Where("event_id = ?", EventId).UpdateColumns(Events{
		EventName:              EventName,
		EventPicture:           EventPicture,
		EventLocation:          EventLocation,
		EventDateFrom:          EventDateFrom,
		EventDateTo:            time.Now().AddDate(0,0,5).String(),
		EventType:              EventCategory,
		EventDescription:       EventDescription,
		EventTermsAndCondition: EventTermsAndCondition,
	})

	return events, nil
}

func DeleteEvent(EventId int) (interface{}, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	db.Where("event_id = ?",EventId).Delete(Events{})

	return Events{}, nil
}
