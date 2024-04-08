const Booking = require("../../models/booking");

const { transformedEvent, transformedBooking } = require("./merge");
const Event = require("../../models/events");

module.exports = {
  bookings: async () => {
    try {
      const bookedEvents = await Booking.find();
      return bookedEvents.map((booking) => transformedBooking(booking));
    } catch (error) {
      throw error;
    }
  },

  // bookedEvents: async (args, req) => {
  //   if (!req.isAuth) {
  //     throw new Error("Unauthenticated");
  //   }
  //   const { userId } = req;
  //   try {
  //     const user = "65febd3aa79b4614d1d60d34";
  //     const event = await Event.findOne({ _id: args.eventId });
  //     const bookedEvent = await Booking.create({
  //       user: userId,
  //       event,
  //     });

  //     return transformedBooking(bookedEvent);
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  cancelBooking: async (args) => {
    try {
      const booking = await Booking.findById(args.bookingId).populate("event");

      const event = transformedEvent(booking.event);

      await Booking.deleteOne({ _id: args.bookingId });

      return event;
    } catch (error) {}
  },
};
