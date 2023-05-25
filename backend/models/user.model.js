export default (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    login: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    full_name: {
      type: Sequelize.STRING,
    },
    last_logon: {
      type: Sequelize.DATE,
    },
    is_auth: {
      type: Sequelize.BOOLEAN,
    },
    role: {
      type: Sequelize.STRING,
    },
  });

  return User;
};