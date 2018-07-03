var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const crypto = require('crypto');


// GET secrete listing
router.get('/', function(req, res, next) {
const decipher = crypto.createDecipher('aes256', 'asaadsaad');

var cipheredmessage;
decipher.on('readable', () => {
  const data = decipher.read();
  if (data)
    decrypted += data.toString('utf8');
});

decipher.on('end', () => {
  console.log(""); 
});


// Use connect method to connect to the server
MongoClient.connect('mongodb://localhost:27017/lab7DB', function(err, client) {
  const db = client.db('lab7DB');
  
  db.collection('homework7').findOne(err, function(err, result){
      if(err) throw err;
      cipheredmessage = result.message;
    
      var decrypted = decipher.update(cipheredmessage, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      res.send(decrypted);
      console.log('my text: ' + decrypted);
  });

  client.close();
});


});

module.exports = router;
