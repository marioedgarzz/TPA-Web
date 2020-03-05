package email

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/marioedgarzz/backend-tpa/database"
	"github.com/marioedgarzz/backend-tpa/models/user"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"

	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/gmail/v1"
)

// dari hasil token  tadi akan di ambil di sini user data nya
func getClient(config *oauth2.Config) *http.Client {
	tokFile := "token.json"
	tok, err := tokenFromFile(tokFile)
	if err != nil {
		tok = getTokenFromWeb(config)
		saveToken(tokFile, tok)
	}
	return config.Client(context.Background(), tok)
}

// ini ngambil token dari web, dia di panggil pas kita jalan di get client
func getTokenFromWeb(config *oauth2.Config) *oauth2.Token {
	authURL := config.AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	fmt.Printf("Go to the following link in your browser then type the "+
		"authorization code: \n%v\n", authURL)

	var authCode string
	if _, err := fmt.Scan(&authCode); err != nil {
		log.Fatalf("Unable to read authorization code: %v", err)
	}

	tok, err := config.Exchange(context.TODO(), authCode)
	if err != nil {
		log.Fatalf("Unable to retrieve token from web: %v", err)
	}
	return tok
}

// yang ini ngambil token yang udah di save dari web tadi simple nya di local
func tokenFromFile(file string) (*oauth2.Token, error) {
	f, err := os.Open(file)
	if err != nil {
		return nil, err
	}
	defer f.Close()
	tok := &oauth2.Token{}
	err = json.NewDecoder(f).Decode(tok)
	return tok, err
}

// ini save token nya , setelah di web tadi di ambil
func saveToken(path string, token *oauth2.Token) {
	fmt.Printf("Saving credential file to: %s\n", path)
	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0600)
	if err != nil {
		log.Fatalf("Unable to cache oauth token: %v", err)
	}
	defer f.Close()
	json.NewEncoder(f).Encode(token)
}

func SendEmail() {
	token, err := ioutil.ReadFile("src/github.com/marioedgarzz/backend-tpa/models/email/credentials.json")
	if err != nil {
		log.Fatalf("Gagal Read JSON nya, Coba check credentials.json dan pastikan sejajar.: %v", err)
	}

	config, err := google.ConfigFromJSON(token, gmail.MailGoogleComScope)
	if err != nil {
		log.Fatalf("Gagal parse config nya, hati hati kalau credentials.json nya di utak atik")
	}
	client := getClient(config)

	service, err := gmail.New(client)
	if err != nil {
		log.Fatalf("Unable to retrieve Gmail client: %v", err)
	}

	FromEmail := "marioedgar241@gmail.com"
	pesan := "HALO ! Ada Promo Menarik Buat Kamu!"

	db, err := database.Connect()

	if err != nil {
		log.Fatalf("Error Connecting")
	}

	defer db.Close()

	var users []user.Users

	db.Where("user_subscription = true").Find(&users)

	for i,_ := range users {
		toEmail := users[i].UserEmail
		var message gmail.Message
		temp := []byte("From: 'me'\r\n" +
			"reply-to:" + FromEmail + "\r\n" +
			"To:  " + toEmail + "\r\n" +
			"Subject: Tiket.com Promo! \r\n" +
			"\r\n" + pesan)

		message.Raw = base64.StdEncoding.EncodeToString(temp)
		message.Raw = strings.Replace(message.Raw, "/", "_", -1)
		message.Raw = strings.Replace(message.Raw, "+", "-", -1)
		message.Raw = strings.Replace(message.Raw, "=", "", -1)

		_, err = service.Users.Messages.Send("me", &message).Do()
		if err != nil {
			fmt.Println("Error Sending..", err)
		}
	}


}

