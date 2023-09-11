export default function resturant_routes(data) {
  //show all available tables from the db
  async function get_tables(req, res) {
    const tables = await data.getTables();
    res.render("index", { tables });
  }

  // Book a table that has not already been booked.
  async function book_table(req, res) {
    //require Number of people in booking
    const number_of_people_booking = req.body.booking_size;
    //require Username
    const username = req.body.username;
    //require Phone number
    const phone_number = req.body.phone_number;
    //select table
    const table = req.body.tableId;
    //book table
    const book_table = await d.bookTable(
      username,
      number_of_people_booking,
      phone_number,
      table
    );
    //If the number of customers is bigger than the table's capacity the table can't be booked.
    //Show a flash error message in this scenario.
    if (book_table) {
      req.flash("success", "Table booked successfully");
    } else {
      req.flash("error", "Unable to book table");
    }
    //Redirect back to the / route - with the required flash message.
    res.redirect("/");
  }

  // Show all the bookings made
  async function post_book(req, res) {
    const tables = await data.getBookedTables();
    res.render("bookings", { tables });
  }

  // Show all the bookings made by a given user and allow booking cancellations
  async function user_bookings(req, res) {
    //require bookings made by a user
    const username = req.params.username;
    //Show all the bookings made by a given user
    // Allow booking cancellations
    const tables = await data.getBookedTablesForUser(username);
    res.render("userBookings", { tables });
  }

  async function cancel_bookings(req, res) {
    //require the body of the table in handlebars
    const table = reg.body.tableName;
    //Cancel the booking booking for the selected table.
    await data.cancelTableBooking(table);
    //Redirect back to the /bookings screen.
    res.redirect("/bookings");
  }

  return {
    get_tables,
    book_table,
    post_book,
    user_bookings,
    cancel_bookings,
  };
}
