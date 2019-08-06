import { withFilter } from "graphql-yoga";
import User from "src/entities/User";

const resolvers = {
  Subscription: {
    NearbyRideSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("rideRequest"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            NearbyRideSubscription: { PickUpLat, PickUpLng }
          } = payload;
          const { lastLat: userLastLat, lastLng: userLastLng } = user;
          return (
            PickUpLat >= userLastLat - 0.05 &&
            PickUpLat <= userLastLat + 0.05 &&
            PickUpLng >= userLastLng - 0.05 &&
            PickUpLng <= userLastLng + 0.05
          );
        }
      )
    }
  }
};
export default resolvers;
