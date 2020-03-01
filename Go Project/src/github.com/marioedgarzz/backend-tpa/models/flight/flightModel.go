package flight

import "github.com/jinzhu/gorm"

type Temp struct {
	gorm.Model
}

type Flight struct {
	FlightId	int
}