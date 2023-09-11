const restaurant = (db) => {

    async function getTables() {
        // get all the available tables
        //select all from booking table, where the table is not booked
        return await db.manyOrNone("SELECT * FROM table_booking WHERE booked = false");
    }


    async function bookTable(tableName, username, phoneNumber, seats) {
        try {
            // book a table by name
            const table = await db.oneOrNone('SELECT * FROM table_booking WHERE table_name = $1;', [tableName]);
            //Book a table that has not already been booked. 
            //if table is not booked
            if(!table){
                //insert user details and select a table
                await db.none('UPDATE table_booking SET booked = true, username = $1, contact_number = $2, number_of_people = $3 WHERE table_name = $4;', 
                [username, phoneNumber, seats, tableName]);
            }
            //If the number of customers is bigger than the table's capacity the table can't be booked. 
            //Show a flash error message in this scenario. 
        } catch (error) {
            console.error(error);
            return "Error booking";
        }
    }
    
    async function getBookedTables() {
        // get all the booked tables
        // select tables where booked is true

    }

    async function isTableBooked(tableName) {
        // get booked table by name
    }

    async function cancelTableBooking(tableName) {
        // cancel a table by name
    }

    async function getBookedTablesForUser(username) {
        // get user table booking
    }

    async function editTableBooking(){
        
    }
    return {
        getTables,
        bookTable,
        getBookedTables,
        isTableBooked,
        cancelTableBooking,
        editTableBooking,
        getBookedTablesForUser
    }
}

export default restaurant;






