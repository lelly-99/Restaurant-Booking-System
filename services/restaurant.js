const restaurant = (db) => {

    async function getTables() {
        // get all the available tables
        //select all from booking table, where the table is not booked
        return await db.manyOrNone("SELECT * FROM table_booking WHERE booked = false");
    }

    async function bookTable({ tableName, username, phoneNumber, seats }) {
        try {
            const table_by_name = await db.oneOrNone('SELECT * FROM table_booking WHERE table_name = $1;', [tableName]);
            if(table_by_name){
                return await db.none('UPDATE table_booking SET booked = true, username = $1, contact_number = $2, number_of_people = $3 WHERE table_name = $4;', 
                [username, phoneNumber, seats, tableName]);
            }else if (!table_by_name) {
                return 'Invalid table name provided';
            } else if (table.booked){
                return 'Table is already booked'
            } else if(seats > table.capacity){
                return 'capacity greater than the table seats';
            } else if (username === ""){
                'Please enter a username';
            }else if (!phoneNumber){
                return 'Please enter a contact number';
            }if (!seats) {
                return 'Please enter the number of seats';
            }
        } catch (error) {
            console.error(error);
            return 'Error booking table';
        }
    }
    
    async function getBookedTables() {
        // get all the booked tables
        // select tables where booked is true
        return await db.manyOrNone("SELECT * FROM table_booking WHERE booked = true");

    }

    async function isTableBooked(tableName) {
        // get booked table by name
        const table = await db.oneOrNone('SELECT * FROM table_booking WHERE table_name = $1;', [tableName]);
        return table ? table.booked : false;
    }

    async function cancelTableBooking(tableName) {
        // cancel a table by name
        //update booking to be false for user
        await db.none('UPDATE table_booking SET booked = false, username = NULL, number_of_people = NULL WHERE table_name = $1;', [tableName]);
    }

    async function getBookedTablesForUser(username) {
        // get user table booking
        //select a table booked for a user
        return await db.any('SELECT * FROM table_booking WHERE username = $1;', [username]);
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


 
    


  









