package database

import(
	"github.com/jinzhu/gorm"
	_"github.com/jinzhu/gorm/dialects/postgres"
)

const Dbname = "tpa"
const Dbhost = "127.0.0.1"
const Dbport = "5432" //default is 5432
const Dbuser = "postgres" //default is postgres
const Dbpassword = "postgres"
//babyotto123
func Connect() (*gorm.DB, error) {
	dialect, err := gorm.Open("postgres","host="+Dbhost+" port="+Dbport+
		" user="+Dbuser+" dbname="+Dbname+" password="+Dbpassword+" sslmode=disable")
	return dialect,err
}



