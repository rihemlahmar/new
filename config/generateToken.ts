import jwt from "jsonwebtoken";
import { Request, Response } from "express";
const { ACTIVE_TOKEN_SECRET, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
  process.env;

export const generateActiveToken = (payload: object) => {
  return jwt.sign(payload, `${ACTIVE_TOKEN_SECRET}`, { expiresIn: "5m" });
};

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, `${ACCESS_TOKEN_SECRET}`, { expiresIn: "2d" });
};

export const generateRefreshToken = (payload: object, res: Response) => {
  const refresh_token = jwt.sign(payload, `${REFRESH_TOKEN_SECRET}`, {
    expiresIn: "30d",
  });
  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: `/api/refresh_token`,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
  });
};

export const jwtDecode = (req: Request) => {
  const token: any = req.header("Authorization");
  let data: any = {
    id: 0,
    email: "",
    phone:"",
  };
  jwt.verify(token, `${ACCESS_TOKEN_SECRET}`, (err: any, decoded: any) => {
    if (decoded) {
      data.id = decoded.id;
      data.email = decoded.email;
      data.phone=decoded.phone
    }
  });
  return data;
};
