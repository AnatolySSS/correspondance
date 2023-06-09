import db from "../models";
import config from "../config/auth.config"
const User = db.user
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcryptjs"

export const AuthController = {
    df: User.findOne({
      where: {
        login: login,
      },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // 24 hours
        });

        var authorities = [];
        user.getRoles().then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
          });
        });
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      })
};
