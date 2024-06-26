/* 
	 Bootstrap5  (https://www.w3schools.com/bootstrap5/) ; 
	 mysql tábla megjelenítése; katt eseményre rekord megjelenítése; popup ablakban rekord módosítás 
	 SQL tokenizer
*/

const util = require('util');
const express = require('express');
const session = require('express-session');
const app    = express();
const port   = 3000;
var session_data;                   // login user adatai
app.use(session({ key:'user_sid', secret:'nagyontitkossütemény', resave:true, saveUninitialized:true }));  /* https://www.js-tutorials.com/nodejs-tutorial/nodejs-session-example-using-express-session */
var DB  = require('./datamodule_mysql.js');
app.use(express.static('public'));    // frontend root mappa (index.html)

app.post('/alapanyagok', (req, res) => {
	var sql = `
		SELECT ID_AA, NEV, FEHERJE, ZSIR, CH, ENERGIA, MEEGYS
		FROM alapanyag
		ORDER BY ID_AA DESC
		LIMIT 100;
	`;
	Send_to_JSON(req, res, sql);	
});

app.post('/mentes', (req, res) => {
	console.log(req.query);

	var nev = req.query.nev;
	var feherje = parseFloat(req.query.feherje);
	var zsir = parseFloat(req.query.zsir);
	var ch = parseFloat(req.query.ch);
	var energia = parseFloat(req.query.energia);
	var meegys = req.query.meegys;
	var sql = `
		INSERT INTO alapanyag (NEV, FEHERJE, ZSIR, CH, ENERGIA, MEEGYS)
		VALUES ("${nev}", ${feherje}, ${zsir}, ${ch}, ${energia}, "${meegys}");
	`;
	Send_to_JSON(req, res, sql);
});

function Send_to_JSON (req, res, sql) {
	DB.query(sql, req, (json_data, error) => {
		let data = error ? error : JSON.parse( json_data ); 
		res.set('Content-Type', 'application/json; charset=UTF-8');
		res.send(data);
		res.end();
	});
}

app.listen(port, function () { console.log(`std13 app listening at http://localhost:${port}`); });