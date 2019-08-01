import User from "../../../entities/User";
import {
  UpdateMyProfileMutationArgs,
  UpdateMyProfileResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import cleanNullArgs from "../../../utils/cleanNullArg";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (
        _,
        args: UpdateMyProfileMutationArgs,
        { req }
      ): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNull: any = cleanNullArgs(args);
        if (notNull.password) {
          user.password = notNull.password;
          user.save();
          delete notNull.password; // 이 부분이 찝찝하군, delete 된다고 하더라도, 로직에서 한번은 비밀번호가 유출 될 가능성이 존재한다.
        }
        try {
          await User.update({ id: user.id }, { ...notNull });
          return {
            ok: true,
            error: null
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message
          };
        }
      }
    )
  }
};

export default resolvers;
