pragma solidity >=0.4.0 <0.6.0;

contract Transaction {

    struct Order {
        uint order_id;
        bytes32 flight_id;
        bytes32 airline_name;
        bytes32 source;
        bytes32 destination; 
        bytes32 date_of_journey;
        bytes32 date_of_arrival;
        uint256 date_of_booking;
        bytes32 flight_time;
        uint price;
    }

    mapping(bytes32 => Order[]) allBookings;


    uint counter;

    function getID() public returns(uint) { return ++counter; }
    
    // function getBookingsOfUser1 (bytes32 user_id) public view returns ( uint[] memory,bytes32[] memory,bytes32[] memory,bytes32[] memory,bytes32[] memory) {
    //     Order[] storage orders = allBookings[user_id];
    //     uint len = orders.length;
    //     uint[] memory order_idArr = new uint[](len);
    //     bytes32[] memory flight_idArr = new bytes32[](len);
    //     bytes32[] memory airline_nameArr = new bytes32[](len);
    //     bytes32[] memory sourceArr = new bytes32[](len);
    //     bytes32[] memory destinationArr = new bytes32[](len);
      

    //     for(uint i=0; i<len; i++) {
    //         order_idArr[i] = orders[i].order_id;
    //         flight_idArr[i] = orders[i].flight_id;
    //         airline_nameArr[i] = orders[i].airline_name;
    //         sourceArr[i] = orders[i].source;
    //         destinationArr[i] = orders[i].destination;
            
    //     }

    //     return (order_idArr,
    //             flight_idArr,
    //             airline_nameArr,
    //             sourceArr,
    //             destinationArr);
    //     }

    function getOrderCount (bytes32 _user_id) view public returns (uint length) {
        length = allBookings[_user_id].length;
    }
    function getABooking (bytes32 _user_id, uint index) view public returns ( uint,bytes32 ,bytes32 ,bytes32, bytes32 , uint256 ,bytes32 ,bytes32 ,uint
    ){
         Order storage order = allBookings[_user_id][index];

        return (order.order_id, order.flight_id, order.airline_name, order.source, order.destination, order.date_of_booking, order.date_of_journey, order.flight_time, order.price);
    }

    // function getBookingsOfUserPart2 (bytes32 user_id) public view returns ( uint256[] memory,uint256[] memory,uint[] memory,uint[] memory
    // ) {
    //         Order[] storage orders = allBookings[user_id];
    //         uint len = orders.length;
           
    //         uint256[] memory date_of_journeyArr = new uint256[](len);
    //         uint256[] memory date_of_bookingArr = new uint256[](len);
    //         uint[] memory flight_timeArr = new uint[](len);
    //         uint[] memory     priceArr = new uint[](len);

    //         for(uint i=0; i<len; i++) {
                
    //             date_of_journeyArr[i] = orders[i].date_of_journey;
    //             date_of_bookingArr[i] = orders[i].date_of_booking;
    //             flight_timeArr[i] = orders[i].flight_time;
    //             priceArr[i] = orders[i].price;
    //         }

    //         return (
    //                 date_of_journeyArr,
    //                 date_of_bookingArr,
    //                 flight_timeArr,
    //                 priceArr);
    //         }

    function aNewBooking (bytes32 _user_id, bytes32 _flight_id, bytes32 _airline_name, bytes32 _source, bytes32 _destination, bytes32 _date_of_journey,bytes32 _date_of_arrival, bytes32 _flight_time, uint _price) public {
        allBookings[_user_id].push(
            Order({
                order_id: getID(),
                flight_id: _flight_id,
                airline_name: _airline_name,
                source: _source,
                destination: _destination,
                date_of_journey: _date_of_journey,
                date_of_arrival: _date_of_arrival,
                date_of_booking: now,
                flight_time: _flight_time,
                price: _price
            })
        );
    }
}