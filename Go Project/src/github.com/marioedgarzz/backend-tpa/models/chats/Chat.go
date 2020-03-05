package chats

import (
	"github.com/jinzhu/gorm"
	"github.com/marioedgarzz/backend-tpa/database"
	"github.com/marioedgarzz/backend-tpa/models/user"
)

type ChatRooms struct {
	ChatRoomId int `gorm:"primary_key:auto_increment"`
	Admin user.Admins `gorm:"foreign_key:AdminId"`
	AdminId int
	User user.Users `gorm:"foreign_key:UserId"`
	UserId int
	ChatLocation string
	ChatPaymentName string
	ChatPaymentPrice int
	ChatPaymentStatus string
	ChatRoomAdminStatus string //starred , archieved, default
	ChatRoomUserStatus string
	ChatRoomAdminRead bool
	ChatRoomUserRead bool
}

type ChatDetails struct {
	ChatDetailsId int `gorm:"primary_key:auto_increment"`
	ChatRoom ChatRooms `gorm:"foreign_key:chat_room_id"`
	ChatRoomId int
	ChatSender string
	ChatReceiver string
	ChatContent string
	ChatDateTime string
}

func InitChats(db *gorm.DB) {
	db.AutoMigrate(&ChatRooms{}).AddForeignKey("user_id","users(user_id)","CASCADE","CASCADE").
		AddForeignKey("admin_id","admins(admin_id)","CASCADE","CASCADE")

	db.AutoMigrate(&ChatDetails{}).AddForeignKey("chat_room_id","chat_rooms(chat_room_id)",
		"CASCADE","CASCADE")
}

func GetAllChatRoomsByAdminId(AdminId int) ([]ChatRooms, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var chatRooms []ChatRooms

	db.Where("admin_id = ? AND chat_room_user_status NOT IN ('Archieved')", AdminId).Find(&chatRooms)

	for i, _ := range chatRooms {
		db.Model(&chatRooms[i]).Related(&chatRooms[i].Admin,"admin_id").
			Related(&chatRooms[i].User,"user_id")
	}

	return chatRooms, nil
}

func GetAllChatRoomsByUserId(UserId int) ([]ChatRooms, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var chatRooms []ChatRooms

	db.Where("user_id = ?  AND chat_room_admin_status NOT IN ('Archieved')", UserId).Find(&chatRooms)

	for i, _ := range chatRooms {
		db.Model(&chatRooms[i]).Related(&chatRooms[i].Admin,"admin_id").
			Related(&chatRooms[i].User,"user_id")
	}

	return chatRooms, nil
}

func GetAllChatsByRoomId(RoomId int) ([]ChatDetails, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var chatDetails []ChatDetails

	db.Where("chat_room_id = ?", RoomId).Find(&chatDetails)

	for i,_ := range chatDetails {
		db.Model(&chatDetails[i]).Related(&chatDetails[i].ChatRoom,"chat_room_id")
		db.Model(&chatDetails[i].ChatRoom).Related(&chatDetails[i].ChatRoom.Admin,"admin_id").
			Related(&chatDetails[i].ChatRoom.User,"user_id")
	}

	return chatDetails, nil
}

func InsertNewRooms(AdminId int, UserId int, ChatLocation string,
	ChatPaymentName string, ChatPaymentPrice int, ChatPaymentStatus string) (*ChatRooms, error){

	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var room = ChatRooms{
		AdminId:             AdminId,
		UserId:              UserId,
		ChatLocation:        ChatLocation,
		ChatPaymentName:     ChatPaymentName,
		ChatPaymentPrice:    ChatPaymentPrice,
		ChatPaymentStatus:   ChatPaymentStatus,
		ChatRoomAdminStatus: "Default",
		ChatRoomUserStatus:  "Default",
		ChatRoomAdminRead:   true,
		ChatRoomUserRead:    true,

	}

	db.Create(&room)

	return &room, nil
}

func UpdateAdminStatus(RoomId int, Status string) (interface{}, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var chatRoom []ChatRooms

	db.Model(&chatRoom).Where("chat_room_id = ?",RoomId).UpdateColumns(
		ChatRooms{
			ChatRoomAdminStatus: Status,
		},
		)

	return chatRoom, nil
}

func UpdateUserStatus(RoomId int, Status string) (interface{}, error){
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var chatRoom []ChatRooms

	db.Model(&chatRoom).Where("chat_room_id = ?",RoomId).UpdateColumns(
		ChatRooms{
			ChatRoomUserStatus: Status,
		},
	)

	return chatRoom, nil
}

func GetLastChatDetailByRoomId(roomId int) (interface{}, error) {
	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	defer db.Close()

	var roomChats []ChatDetails

	db.Model(&roomChats).Where("chat_room_id = ?", roomId).Order("chat_details_id desc").Find(&roomChats)

	return roomChats, nil
}


func SendMessage(ChatRoomId int, SenderRole string, ReceiverRole string, contentMessage string, chatDateTime string) (*ChatDetails, error){

	db, err := database.Connect()

	if err != nil {
		return nil, err
	}

	var chatRoom []ChatRooms

	db.Where("chat_room_id = ?",ChatRoomId).Find(&chatRoom)
	
	if ReceiverRole == "Admin" {
		chatRoom[0].ChatRoomAdminRead = false
	} else {
		chatRoom[0].ChatRoomUserRead = false
	}

	defer db.Close()

	var ChatDetail = ChatDetails{
		ChatRoomId:    ChatRoomId,
		ChatSender:    SenderRole,
		ChatReceiver:  ReceiverRole,
		ChatContent:   contentMessage,
		ChatDateTime:  chatDateTime,
	}

	db.Create(&ChatDetail)

	return &ChatDetail, nil
}