const { User, Provider, UserToken } = require("../../../models/index");
const {
  createAccessToken,
  decodeToken,
  createRefreshToken,
} = require("../../../utils/jwt");
const { errorResponse } = require("../../../utils/response");

const authController = {
  login: async (req, res) => {
    const data = req.user;
    const { profile } = data;
    console.log(profile);
    const [provider] = await Provider.findOrCreate({
      where: {
        name: profile.provider,
      },
      defaults: {
        name: profile.provider,
      },
    });
    const [user] = await User.findOrCreate({
      attributes: {
        exclude: ["password"],
      },
      where: {
        email: profile.email || profile.emails[0].value,
        provider_id: provider.id,
      },
      defaults: {
        email: profile.email || profile.emails[0].value,
        name: profile.displayName || profile.username,
        provider_id: provider.id,
      },
    });

    const accessToken = createAccessToken({
      userId: user.id,
    });

    const refreshToken = createRefreshToken();

    await UserToken.create({
      user_id: user.id,
      refreshToken,
    });

    console.log("refreshToken", refreshToken);

    console.log("token ", accessToken);
    // const accessToken = req.get("Authorization")?.split(" ").slice(1).join();

    return res.status(200).json({
      status: 200,
      success: true,
      message: "Đăng nhập thành công",
      result: {
        accessToken,
        refreshToken,
      },
    });
    // try {
    //   const { userId } = decodeToken(accessToken);
    //   console.log("userId ", userId);
    //   const userData = await User.findByPk(userId);
    //   console.log(userData);
    //   return res.status(200).json({
    //     status: 200,
    //     success: true,
    //     message: "Đăng nhập thành công",
    //     result: {
    //       userData,
    //       accessToken,
    //     },
    //   });
    // } catch (e) {
    //   return errorResponse(res, 401, "Unauthorize");
    // }
  },
};
module.exports = authController;
