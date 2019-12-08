
Web3 = require('web3')
web3 = new Web3("http://localhost:8545");
var account = '0xeDf5C721815208296Ec3E7455BB7f4D12B586BF6';
console.log(account);
abi = [{"constant":false,"inputs":[{"internalType":"bytes32","name":"_user_id","type":"bytes32"},{"internalType":"bytes32","name":"_flight_id","type":"bytes32"},{"internalType":"bytes32","name":"_airline_name","type":"bytes32"},{"internalType":"bytes32","name":"_source","type":"bytes32"},{"internalType":"bytes32","name":"_destination","type":"bytes32"},{"internalType":"bytes32","name":"_date_of_journey","type":"bytes32"},{"internalType":"bytes32","name":"_date_of_arrival","type":"bytes32"},{"internalType":"bytes32","name":"_flight_time","type":"bytes32"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"aNewBooking","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_user_id","type":"bytes32"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getABooking","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"bytes32","name":"","type":"bytes32"},{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"getID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_user_id","type":"bytes32"}],"name":"getOrderCount","outputs":[{"internalType":"uint256","name":"length","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];


const contract = new web3.eth.Contract(abi);
contract.options.address = "0x5E38DfA5F836048e886C2Da296741f01e5948BD7";

// // contract.methods.aNewBooking(web3.utils.asciiToHex("abc"),web3.utils.asciiToHex("AI111"),web3.utils.asciiToHex("AI"),web3.utils.asciiToHex("BOM"),web3.utils.asciiToHex("BLR"),web3.utils.asciiToHex("12/12/23"), web3.utils.asciiToHex("12/12/23"), web3.utils.asciiToHex("11:11"),123).send({from: account, gas: 1231233}).then((f) => {
// //     console.log(f)
// // });




// // (web3.utils.asciiToHex(),web3.utils.asciiToHex(),web3.utils.asciiToHex(),web3.utils.asciiToHex(),web3.utils.asciiToHex(),1231231231231, 2313123131212,123)
// // bytes32 _user_id, bytes32 _flight_id, bytes32 _airline_name, bytes32 _source, bytes32 _destination, uint256 _date_of_journey, uint _flight_time, uint _price


var express = require("express");
var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});
app.get("/booking/:uuid", async function (request, response, next)  {
    var uuid = request.params.uuid;
    i = 0;
    abc = [];
    count = await contract.methods.getOrderCount(web3.utils.asciiToHex(uuid)).call();
    console.log(count);
    for (var j = 0; j < count; j++) {
        f = await contract.methods.getABooking(web3.utils.asciiToHex(uuid), j).call();
            console.log(f);
            abc.push({
                "order_id": f[0],
                "flight_id": web3.utils.hexToAscii(f[1]).replace(/\0.*$/g,''),
                "airline_name": web3.utils.hexToAscii(f[2]).replace(/\0.*$/g,''),
                "source": web3.utils.hexToAscii(f[3]).replace(/\0.*$/g,''),
                "destination": web3.utils.hexToAscii(f[4]).replace(/\0.*$/g,''),
                "date_of_booking": (f[5]),
                "date_of_journey": web3.utils.hexToAscii(f[6]).replace(/\0.*$/g,''),
                "flight_time": web3.utils.hexToAscii(f[7]).replace(/\0.*$/g,''),
                "price": (f[8])
            })
            
    }
    response.json(abc);

});
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post("/booking/:uuid", async function (request, response, next) {
    var uuid = request.params.uuid;

    var flight_number = request.param('flight_number', null)
    var airline_name = request.param('airline', null)
    var source = request.param('source', null)
    var dest = request.param('dest', null)
    var date_of_journey = request.param('date_of_journey', null)
    var date_of_arrival = request.param('date_of_arrival', null)
    var flight_time = request.param('flight_time', null)
    var price = parseInt(request.param('price', null))
    console.log(request.query)

    try {
        res = await contract.methods.aNewBooking(web3.utils.asciiToHex(uuid),web3.utils.asciiToHex(flight_number),web3.utils.asciiToHex(airline_name),web3.utils.asciiToHex(source),web3.utils.asciiToHex(dest),web3.utils.asciiToHex(date_of_journey), web3.utils.asciiToHex(date_of_arrival), web3.utils.asciiToHex(flight_time),price).send({from: account, gas: 1231233});
        response.json(true);
    } catch (e) {
        console.log(e);
        response.json(false);
    }

})