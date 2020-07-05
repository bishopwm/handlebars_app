# Plivo SMS App

### Environment Dependencies

##### Credentials and local variables: 
* To run locally, create a new `.env` file in the root folder with the following variables:
`
    AUTH_ID='your_id_here'
    AUTH_TOKEN='your_token_here'
    PHONE1='your_personal_phone'
    PHONE2='your_plivo_phone'

PORT=[desired_port]

`

##### Package Dependencies: 
###### Install the following packages:
* [if using .env for credentials] `npm install dotenv`
* `npm install plivo`
* `npm install axios`
* `npm install express`
* `npm install express-handlebars`
* `npm install bootstrap`

##### Backend Instructions
###### In console/terminal, run:
* Express Server: From root, run `node receiveSMS.js` to start express server
* ngrok: From root, run `./ngrok http 8000` ( NOTE: If you don't have .ngrok installed, see https://ngrok.com/download )
* ngrok: From ./ngrok panel, copy the HTTPS forwarding URL
* Navigate to console.plivo.com/voice.applications and create a new app (or edit an existing one). Set the Message URL to your ./ngrok forwarding URL

##### Frontend (Handlebars) Instructions
###### In console/terminal, run:
* From root, run `node index.js`

##### View app locally at localhost:[your_port]
