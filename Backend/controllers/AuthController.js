import prisma from "../DB/db.config.js";
import vine, { errors } from "@vinejs/vine";
import { loginSchema, registerSchema } from "../validation/authValidation.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  //  for user registration
  static async register(req, res) {
    try {
      const body = req.body;

      const validator = vine.compile(registerSchema);

      const payload = await validator.validate(body);

      const finduser = await prisma.users.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (finduser) {
        return res.status(400).json({
          errors: {
            email: "Email already taken .please use another one",
          },
        });
      }

      const salt = bcrypt.genSaltSync(10);
      payload.password = bcrypt.hashSync(payload.password, salt);

      const user = await prisma.users.create({
        data: payload,
      });

      return res.json({
        status: 200,
        message: "user created scuessfully",
        user: user,
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.log(error.messages);
        return res.status(400).json({ errors: error.messages });
      } else {
        return res
          .status(500)
          .json({ message: "Something went wrong.please try again" });
      }
    }
  }

  //  for user login
  static async login(req, res) {
    try {
      const body = req.body;
      const validator = vine.compile(loginSchema);
      const payload = await validator.validate(body);

      const findUser = await prisma.users.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (findUser) {
        if (!bcrypt.compareSync(payload.password, findUser.password)) {
          return res.status(400).json({
            errors: {
              password: "invalid credentials",
            },
          });
        }

        const payloadData = {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
          profile: findUser.profile,
        };
        const token = await jwt.sign(payloadData, process.env.JWTKEY, {
          expiresIn: "1h",
        });

        return res.status(200).json({
          message: "Logged in",
          access_token: `Bearer ${token}`,
          user: payloadData,
        });
      }

      return res.status(400).json({
        errors: {
          email: "No user found with this email ",
        },
      });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.log(error.messages);
        return res.status(400).json({ error: error.messages });
      } else {
        return res
          .status(500)
          .json({ message: "Something went wrong.please try again" });
      }
    }
  }

  // for add favorites
  static async addFavorites(req, res) {
    console.log("heeloo", req.user);
    const { city } = req.body;
    const userId = req.user.id;

    try {
      // Check if the city is already in the user's favorites
      const existingFavorite = await prisma.favorites.findFirst({
        where: {
          userId,
          city,
        },
      });

      if (existingFavorite) {
        return res
          .status(400)
          .json({ status: 400, message: "City is already in your favorites" });
      }

      // If not, add the city to favorites
      const favorite = await prisma.favorites.create({
        data: {
          city,
          userId,
        },
      });

      res.json({ status: 200, message: "City added to favorites", favorite });
    } catch (error) {
      console.error("Error adding to favorites:", error);
      res.status(500).json({ status: 500, message: "Something went wrong" });
    }
  }

  // get favorites
  static async getFavorites(req, res) {
    const userId = req.user.id;

    try {
      const favorites = await prisma.favorites.findMany({
        where: { userId },
        select: { city: true },
      });
      console.log(favorites);

      res.json({ status: 200, favorites });
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ status: 500, message: "Something went wrong" });
    }
  }
  //   remove favorites
  static async removeFavorite(req, res) {
    const userId = req.user.id;
    const { city } = req.body;

    try {
      const favorite = await prisma.favorites.findFirst({
        where: { userId, city },
      });

      await prisma.favorites.delete({
        where: { id: favorite.id },
      });

      res.json({
        status: 200,
        message: "City removed from favorites",
        favorite,
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ status: 500, message: "Something went wrong" });
    }
  }
}

export default AuthController;
