const Event = require("../../models/events");
const { transformedEvent, transformedBooking } = require("./merge");
const Booking = require("../../models/booking");

const user = require("../../models/user");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();

      return events.map((event) => transformedEvent(event));
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args, req, res, next) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }

    try {
      const findUser = await user.findById(args.eventInput.creator);
      if (!findUser) {
        throw new Error("user not found");
      } else {
        const even = await Event.create({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date().toISOString(),
          creator: args.eventInput.creator,
        });

        findUser.createdEvents.push(even);
        findUser.save();
        return transformedEvent(even);
      }
    } catch (error) {
      throw error;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const { userId } = req;

    try {
      const event = await Event.findOne({ _id: args.eventId });
      const bookedEvent = await Booking.create({
        user: userId,
        event,
      });

      return transformedBooking(bookedEvent);
    } catch (error) {
      throw error;
    }
  },
};
