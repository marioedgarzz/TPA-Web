package user

import (
	"fmt"
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
)

type Temp struct {
	gorm.Model
}

type Users struct {
	UserId 			int 	`gorm:"PRIMARY_KEY;AUTO_INCREMENT"`
	Username        string
	UserEmail       string
	UserPassword    string
	UserPhoneNumber string
	UserCurrency	string
	UserLanguage	string
	UserCity		string
	UserAddress		string
	UserPostalCode	string
	UserTitle		string
}

type Admins struct {
	AdminId int `gorm:"primary_key;auto_increment"`
	AdminUsername string
	AdminPassword string
}

func init() {
	db, err := database.Connect()
	if err != nil {
		panic("Connection to database failed")
	}
	//db.DropTableIfExists(&Users{})
	db.AutoMigrate(&Users{})
	db.AutoMigrate(&Admins{})
}

func GetAllUsers() ([]Users, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}
	defer db.Close()

	var users []Users

	db.Find(&users)

	fmt.Println(users)

	return users, nil
}

func GetUserByPhoneOrEmail(phoneOrEmail string) ([]Users, error) {
	db,err := database.Connect()
	if err != nil {
		panic("Connection to database failed!")
	}

	var users []Users

	db.Where("user_email = ? OR user_phone_number = ?",phoneOrEmail,phoneOrEmail).Find(&users)

	return users, nil
}

func CreateNewUser(Username string, UserEmail string, UserPassword string, UserPhoneNumber string) (*Users, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var user = Users{
		Username:        Username,
		UserEmail:       UserEmail,
		UserPassword:    UserPassword,
		UserPhoneNumber: UserPhoneNumber,
		UserCurrency:    "IDR",
		UserLanguage:    "Indonesia",
	}

	if db.NewRecord(user) {
		db.Create(&user)
	}

	return &user, nil
}

func GetUserById(Id int) ([]Users, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var user []Users

	db.Where("user_id = ?", Id).Find(&user)

	return user, nil
}

func SetUserCurrency(UserId int, UserCurrency string) ([]Users, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var user []Users

	fmt.Println("Data currency : " + UserCurrency + " : id : ")
	fmt.Println(UserId)

	db.Model(&user).Where("user_id = ?",UserId).Update("user_currency",UserCurrency).Find(&user)

	return user, nil
}

func SetUserLanguage(UserId int, UserLanguage string) ([]Users, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var user []Users

	db.Model(&user).Where("user_id = ?",UserId).Update("user_language",UserLanguage)

	return user, nil
}

func UpdateAccountData(UserId int, UserTitle string, Username string, UserCity string, UserAddress string, UserPostalCode string) ([]Users, error){

	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var user []Users

	db.Model(&user).Where("user_id = ?",UserId).UpdateColumns(
		Users{
			Username:Username,
			UserTitle:UserTitle,
			UserCity:UserCity,
			UserAddress:UserAddress,
			UserPostalCode:UserPostalCode,
		})

	return user, nil
}

func GetAdminByUsernameAndPassword(username string, password string) (interface{}, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var admins []Admins

	db.Where("admin_username = ? AND admin_password = ?",username,password).Find(&admins)

	return admins, nil
}

func GetAdminById(adminId int) (interface{}, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var admins []Admins

	db.Where("admin_id = ?",adminId).Find(&admins)

	return admins, nil
}