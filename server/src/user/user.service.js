const Promise = require("bluebird");
const shortId = require("../../helpers/shortId");

module.exports = app => {
  const service = {};
  const User = app.models.User;
  const UserDetail = app.models.UserDetail;

  const findUser = params => {
    return User.findOne({
      where: { deletedAt: null },
      include: [
        {
          model: UserDetail,
          as: "UserDetail",
          attributes: [
            "id",
            "userId",
            "slug",
            "name",
            "googleId",
            "googleProfile",
            "photoUrl",
            "email"
          ],
          where: {
            ...params,
            deletedAt: null
          }
        }
      ]
    });
  };

  service.findUser = userDetail => {
    return findUser(userDetail);
  };

  service.findOrCreateOrUpdate = async userDetail => {
    let user = await findUser({ googleId: userDetail.googleProfile.id });

    const userDetailData = {
      name: userDetail.displayName,
      photoUrl: userDetail.photoUrl,
      email: userDetail.email,
      googleId: userDetail.googleProfile.id,
      googleProfile: userDetail.googleProfile
    };

    // IF doesn't exists, Create
    let newUser = null;
    if (!user) {
      newUser = await User.create();

      const newUserDetail = await UserDetail.create({
        ...userDetailData,
        userId: newUser.id,
        slug: shortId({ size: 14 }),
        createdByUserId: newUser.id
      });

      newUser.UserDetail = newUserDetail;

      return new Promise(resolve => resolve(newUser));
    }

    const newUserDetailData = {
      ...user.userDetail,
      ...userDetailData
    };

    // If it exists Update
    const userDetailUpdated = await UserDetail.update(newUserDetailData, {
      where: { userId: user.id, deletedAt: null }
    });

    user.UserDetail = userDetailUpdated;

    //Than return
    return new Promise(resolve => resolve(user));
  };

  service.findByPk = userId => {
    return findUser({ id: userId });
  };

  app.services.user = service;
  return service;
};
