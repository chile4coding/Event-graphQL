const user = require("../../models/user");
const Event = require("../../models/events");
const { dateToString } = require("../../helpers/date");

async function createUserEvents(eventId) {
  const userEvent = await Event.find({ _id: { $in: eventId } });
  return userEvent.map((event) => {
    return {
      ...event._doc,
      _id: event.id,
      creator: creator.bind(this, event.creator),
    };
  });
}

async function creator(userId) {
  try {
    const foundUser = await user.findById(userId);

    return {
      ...foundUser._doc,
      _id: foundUser.id,
      createdUserEvents: createUserEvents(foundUser._doc.createdEvents),
    };
  } catch (error) {
    throw error;
  }
}

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformedEvent(event);
  } catch (error) {
    throw error;
  }
};

const transformedEvent = (event) => {
  return {
    ...event._doc,
    _id: event._doc._id.toString(),
    creator: creator.bind(this, event._doc.creator),
  };
};

const transformedBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking._id,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
    user: creator.bind(this, booking.user),
    event: singleEvent.bind(this, booking.event._id),
  };
};

exports.transformedEvent = transformedEvent;
exports.transformedBooking = transformedBooking;
