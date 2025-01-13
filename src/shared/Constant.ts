import jwt from "jsonwebtoken";

export const SecretKey =
  process.env.SECRET_KEY || "agfnsdfhgsjdfbvjdjhxncbdsfcjdstdsh763543nfgeurt";

export const GenerateAccessToken = (data) => {
  const a = {
    _id: data._id,
    username: data.username,
    name: data.name,
    position: data.position,
    sessionId: data.sessionId,
  };
  const accessToken = jwt.sign(a, SecretKey, {
    expiresIn: "1h",
    // expiresIn: "10s",
  });

  return accessToken;
};

export const GenerateRefreshToken = (data) => {
  const a = {
    _id: data._id,
    username: data.username,
    position: data.position,
    name: data.name,
    sessionId: data.sessionId,
  };
  const refreshToken = jwt.sign(a, SecretKey, {
    expiresIn: "6h",
    // expiresIn: "15s",
  });

  return refreshToken;
};
