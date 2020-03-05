import { Component, OnInit } from '@angular/core';
import { UserStorageService } from 'src/app/services/user-storage.service';
import { GraphqlUsersService } from 'src/app/services/graphql-users.service';
import { Users } from 'src/app/models/types';
import { Router } from '@angular/router';
import { TrainTransactionService } from 'src/app/services/transactions/train-transaction.service';
import { TrainSchedule } from 'src/app/models/train';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent implements OnInit {

  constructor(private userService : GraphqlUsersService,
    private router : Router, private trainTransactionService : TrainTransactionService) { }

  private regions : any[];
  private nationality : string;
  private user : Users
  private trainTransactionId : number;

  private currTransaction : TrainSchedule;
  private countDown : number;

  step1 : boolean = true;
  step2 : boolean = false;
  step3 : boolean = false;

  name : string;
  address : string;
  phoneNumber : string;
  email : string;
  errorMsg : string;

  payments : string;
  ngOnInit() {

    // this.trainTransactionId = 
    let id = UserStorageService.getCurrentUserId()

    this.userService.getUserById(id).subscribe(
      async result => {
        await (this.user = result[0],
          this.name = this.user.Username,
          this.address = this.user.UserAddress,
          this.phoneNumber = this.user.UserPhoneNumber,
          this.email = this.user.UserEmail)
      }
    )
    
    this.pushFlag();
    this.countDown = 60;
    setInterval(()=> {
      this.countDown--;
      if(this.countDown == 0) {
        alert("Timeout!"),
        this.router.navigate(["/"])
      }
    },1000)
  }

  buy() {
    var scheduleId =+ UserStorageService.getCurrentTransaction();
    var userId = UserStorageService.getCurrentUserId();
    if(userId == 0) {
      alert("Please login to buy");
      this.router.navigate(["/"]);
      return;
    }
    var currDate = new Date().toLocaleDateString();

    this.trainTransactionService.createNewTrainTransaction(scheduleId,userId,currDate).subscribe(
      async result => {
        await (alert("Train transaction success!"),
        this.router.navigate(["/"])
         )
      }
    )
  }

  nextStep() {
    if(this.step1 == true) {
      console.log(this.name)
      if(this.name == "" || this.name == undefined) {
        this.errorMsg = "Name must be filled!"
        return
      }
      if(this.address == "" || this.address == undefined) {
        this.errorMsg = "Address must be filled!"
        return
      }
      if(this.email == "" || this.email == undefined) {
        this.errorMsg = "Email must be filled!"
        return
      }
      if(this.phoneNumber == "" || this.phoneNumber == undefined) {
        this.errorMsg = "Phone Number must be filled!"
        return
      }
      this.step1 = false;
      this.step2 = true;
      document.getElementById("step2").style.color = "black"
      document.getElementById("step2").style.fontSize = "20px"
    }
    else {
      this.step3 = true;
      document.getElementById("step3").style.color = "black"
      document.getElementById("step3").style.fontSize = "20px"
    }
  }

  pushFlag(){
    this.regions = [{code: "XD",name:"Adele Island"},
    {code: "AF",name:"Afghanistan"},
    {code: "AX",name:"Aland Islands"},
    {code: "XC",name:"Alaska"},
    {code: "AL",name:"Albania"},
    {code: "DZ",name:"Algeria"},
    {code: "AS",name:"American Samoa"},
    {code: "AD",name:"Andorra"},
    {code: "AO",name:"Angola"},
    {code: "AI",name:"Anguilla"},
    {code: "AQ",name:"Antarctica"},
    {code: "AG",name:"Antigua and Barbuda"},
    {code: "AR",name:"Argentina"},
    {code: "AM",name:"Armenia"},
    {code: "AW",name:"Aruba"},
    {code: "XE",name:"Ascension Island"},
    {code: "AU",name:"Australia"},
    {code: "AT",name:"Austria"},
    {code: "AZ",name:"Azerbaijan"},
    {code: "XA",name:"Azores"},
    {code: "BS",name:"Bahamas"},
    {code: "BH",name:"Bahrain"},
    {code: "BD",name:"Bangladesh"},
    {code: "BB",name:"Barbados"},
    {code: "BY",name:"Belarus"},
    {code: "BE",name:"Belgium"},
    {code: "BZ",name:"Belize"},
    {code: "BJ",name:"Benin"},
    {code: "BM",name:"Bermuda"},
    {code: "BT",name:"Bhutan"},
    {code: "BO",name:"Bolivia"},
    {code: "BQ",name:"Bonaire, Sint Eustatius and Saba"},
    {code: "BA",name:"Bosnia and Herzegovina"},
    {code: "BW",name:"Botswana"},
    {code: "BV",name:"Bouvet Island"},
    {code: "BR",name:"Brazil"},
    {code: "IO",name:"British Indian Ocean Territory"},
    {code: "BN",name:"Brunei Darussalam"},
    {code: "BG",name:"Bulgaria"},
    {code: "BF",name:"Burkina Faso"},
    {code: "BI",name:"Burundi"},
    {code: "CV",name:"Cabo Verde"},
    {code: "KH",name:"Cambodia"},
    {code: "CM",name:"Cameroon"},
    {code: "CA",name:"Canada"},
    {code: "KY",name:"Cayman Islands"},
    {code: "CF",name:"Central African Republic"},
    {code: "TD",name:"Chad"},
    {code: "CL",name:"Chile"},
    {code: "CN",name:"China"},
    {code: "CX",name:"Christmas Island"},
    {code: "CC",name:"Cocos (Keeling) Islands"},
    {code: "CO",name:"Colombia"},
    {code: "KM",name:"Comoros"},
    {code: "CG",name:"Congo"},
    {code: "CD",name:"Congo (DR)"},
    {code: "CK",name:"Cook Islands"},
    {code: "CR",name:"Costa Rica"},
    {code: "CI",name:"Cote d'Ivoire"},
    {code: "HR",name:"Croatia"},
    {code: "XF",name:"Crozet Archipelago"},
    {code: "CU",name:"Cuba"},
    {code: "CW",name:"Curacao"},
    {code: "CY",name:"Cyprus"},
    {code: "CZ",name:"Czech Republic"},
    {code: "CS",name:"Czechoslovakia"},
    {code: "DK",name:"Denmark"},
    {code: "DJ",name:"Djibouti"},
    {code: "DM",name:"Dominica"},
    {code: "DO",name:"Dominican Republic"},
    {code: "TL",name:"East Timor"},
    {code: "EC",name:"Ecuador"},
    {code: "EG",name:"Egypt"},
    {code: "SV",name:"El Salvador"},
    {code: "GQ",name:"Equatorial Guinea"},
    {code: "ER",name:"Eritrea"},
    {code: "EE",name:"Estonia"},
    {code: "ET",name:"Ethiopia"},
    {code: "FK",name:"Falkland Islands"},
    {code: "FO",name:"Faroe Islands"},
    {code: "FJ",name:"Fiji"},
    {code: "FI",name:"Finland"},
    {code: "FR",name:"France"},
    {code: "GF",name:"French Guiana"},
    {code: "PF",name:"French Polynesia"},
    {code: "TF",name:"French Southern Territories"},
    {code: "GA",name:"Gabon"},
    {code: "GM",name:"Gambia"},
    {code: "GE",name:"Georgia"},
    {code: "DD",name:"German Democratic Republic"},
    {code: "DE",name:"Germany"},
    {code: "GH",name:"Ghana"},
    {code: "GI",name:"Gibraltar"},
    {code: "GR",name:"Greece"},
    {code: "GL",name:"Greenland"},
    {code: "GD",name:"Grenada"},
    {code: "GP",name:"Guadeloupe"},
    {code: "GU",name:"Guam"},
    {code: "GT",name:"Guatemala"},
    {code: "GG",name:"Guernsey"},
    {code: "GN",name:"Guinea"},
    {code: "GW",name:"Guinea-Bissau"},
    {code: "GY",name:"Guyana"},
    {code: "HT",name:"Haiti"},
    {code: "HM",name:"Heard Island and McDonald Islands"},
    {code: "VA",name:"Holy See"},
    {code: "HN",name:"Honduras"},
    {code: "HK",name:"Hong Kong"},
    {code: "HU",name:"Hungary"},
    {code: "IS",name:"Iceland"},
    {code: "IN",name:"India"},
    {code: "ID",name:"Indonesia"},
    {code: "IR",name:"Iran"},
    {code: "IQ",name:"Iraq"},
    {code: "IE",name:"Ireland"},
    {code: "IM",name:"Isle of Man"},
    {code: "IL",name:"Israel"},
    {code: "IT",name:"Italy"},
    {code: "JM",name:"Jamaica"},
    {code: "JP",name:"Japan"},
    {code: "JE",name:"Jersey"},
    {code: "JO",name:"Jordan"},
    {code: "KZ",name:"Kazakhstan"},
    {code: "KE",name:"Kenya"},
    {code: "XG",name:"Kerguelen Islands"},
    {code: "KI",name:"Kiribati"},
    {code: "KR",name:"Korea"},
    {code: "KW",name:"Kuwait"},
    {code: "KG",name:"Kyrgyzstan"},
    {code: "LA",name:"Lao People's Democratic Republic"},
    {code: "LV",name:"Latvia"},
    {code: "LB",name:"Lebanon"},
    {code: "LS",name:"Lesotho"},
    {code: "LR",name:"Liberia"},
    {code: "LY",name:"Libya"},
    {code: "LI",name:"Liechtenstein"},
    {code: "LT",name:"Lithuania"},
    {code: "LU",name:"Luxembourg"},
    {code: "MO",name:"Macao"},
    {code: "MK",name:"Macedonia (FYROM)"},
    {code: "MG",name:"Madagascar"},
    {code: "XB",name:"Madeira"},
    {code: "MW",name:"Malawi"},
    {code: "MY",name:"Malaysia"},
    {code: "MV",name:"Maldives"},
    {code: "ML",name:"Mali"},
    {code: "MT",name:"Malta"},
    {code: "MH",name:"Marshall Islands"},
    {code: "MQ",name:"Martinique"},
    {code: "MR",name:"Mauritania"},
    {code: "MU",name:"Mauritius"},
    {code: "YT",name:"Mayotte"},
    {code: "MX",name:"Mexico"},
    {code: "FM",name:"Micronesia"},
    {code: "MD",name:"Moldova"},
    {code: "MC",name:"Monaco"},
    {code: "MN",name:"Mongolia"},
    {code: "ME",name:"Montenegro"},
    {code: "MS",name:"Montserrat"},
    {code: "MA",name:"Morocco"},
    {code: "MZ",name:"Mozambique"},
    {code: "MM",name:"Myanmar"},
    {code: "NA",name:"Namibia"},
    {code: "NR",name:"Nauru"},
    {code: "NP",name:"Nepal"},
    {code: "NL",name:"Netherlands"},
    {code: "AN",name:"Netherlands Antilles"},
    {code: "NC",name:"New Caledonia"},
    {code: "NZ",name:"New Zealand"},
    {code: "NI",name:"Nicaragua"},
    {code: "NE",name:"Niger"},
    {code: "NG",name:"Nigeria"},
    {code: "NU",name:"Niue"},
    {code: "NF",name:"Norfolk Island"},
    {code: "KP",name:"North Korea"},
    {code: "MP",name:"Northern Mariana Islands"},
    {code: "NO",name:"Norway"},
    {code: "OM",name:"Oman"},
    {code: "PK",name:"Pakistan"},
    {code: "PW",name:"Palau"},
    {code: "PS",name:"Palestine"},
    {code: "PA",name:"Panama"},
    {code: "PG",name:"Papua New Guinea"},
    {code: "PY",name:"Paraguay"},
    {code: "PE",name:"Peru"},
    {code: "PH",name:"Philippines"},
    {code: "PN",name:"Pitcairn"},
    {code: "PL",name:"Poland"},
    {code: "PT",name:"Portugal"},
    {code: "PR",name:"Puerto Rico"},
    {code: "QA",name:"Qatar"},
    {code: "RE",name:"Reunion"},
    {code: "RO",name:"Romania"},
    {code: "RU",name:"Russian Federation"},
    {code: "RW",name:"Rwanda"},
    {code: "BL",name:"Saint Barthelemy"},
    {code: "SH",name:"Saint Helena, Ascension and Tristan da Cunha"},
    {code: "KN",name:"Saint Kitts and Nevis"},
    {code: "LC",name:"Saint Lucia"},
    {code: "MF",name:"Saint Martin (FR)"},
    {code: "XI",name:"Saint Paul and Amsterdam Islands"},
    {code: "PM",name:"Saint Pierre and Miquelon"},
    {code: "VC",name:"Saint Vincent and the Grenadines"},
    {code: "WS",name:"Samoa"},
    {code: "SM",name:"San Marino"},
    {code: "ST",name:"Sao Tome and Principe"},
    {code: "SA",name:"Saudi Arabia"},
    {code: "SN",name:"Senegal"},
    {code: "RS",name:"Serbia"},
    {code: "SC",name:"Seychelles"},
    {code: "SL",name:"Sierra Leone"},
    {code: "SG",name:"Singapore"},
    {code: "SX",name:"Sint Maarten (NL)"},
    {code: "SK",name:"Slovakia"},
    {code: "SI",name:"Slovenia"},
    {code: "SB",name:"Solomon Islands"},
    {code: "SO",name:"Somalia"},
    {code: "ZA",name:"South Africa"},
    {code: "GS",name:"South Georgia and the South Sandwich Islands"},
    {code: "SS",name:"South Sudan"},
    {code: "ES",name:"Spain"},
    {code: "LK",name:"Sri Lanka"},
    {code: "SD",name:"Sudan"},
    {code: "SR",name:"Suriname"},
    {code: "SJ",name:"Svalbard and Jan Mayen"},
    {code: "SZ",name:"Swaziland"},
    {code: "SE",name:"Sweden"},
    {code: "CH",name:"Switzerland"},
    {code: "SY",name:"Syrian Arab Republic"},
    {code: "XH",name:"Tahiti"},
    {code: "TW",name:"Taiwan (Province of China)"},
    {code: "TJ",name:"Tajikistan"},
    {code: "TZ",name:"Tanzania"},
    {code: "TH",name:"Thailand"},
    {code: "TG",name:"Togo"},
    {code: "TK",name:"Tokelau"},
    {code: "TO",name:"Tonga"},
    {code: "TT",name:"Trinidad and Tobago"},
    {code: "TN",name:"Tunisia"},
    {code: "TR",name:"Turkey"},
    {code: "TM",name:"Turkmenistan"},
    {code: "TC",name:"Turks and Caicos Islands"},
    {code: "TV",name:"Tuvalu"},
    {code: "UG",name:"Uganda"},
    {code: "UA",name:"Ukraine"},
    {code: "AE",name:"United Arab Emirates"},
    {code: "GB",name:"United Kingdom"},
    {code: "UM",name:"United States Minor Outlying Islands"},
    {code: "US",name:"United States of America"},
    {code: "ZZ",name:"Unknown"},
    {code: "UY",name:"Uruguay"},
    {code: "UZ",name:"Uzbekistan"},
    {code: "VU",name:"Vanuatu"},
    {code: "VE",name:"Venezuela"},
    {code: "VN",name:"Viet Nam"},
    {code: "VG",name:"Virgin Islands (GB)"},
    {code: "VI",name:"Virgin Islands (US)"},
    {code: "WF",name:"Wallis and Futuna"},
    {code: "EH",name:"Western Sahara"},
    {code: "YE",name:"Yemen"},
    {code: "YU",name:"Yugoslavia"},
    {code: "ZM",name:"Zambia"},
    {code: "ZW",name:"Zimbabwe"}]
  }

}
