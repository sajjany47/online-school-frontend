// pages/api/protected.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const SECRET_KEY = process.env.NEXTAUTH_SECRET || "your-secret-key";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret: SECRET_KEY });

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Token is valid; proceed with your logic
  res.status(200).json({ message: "Protected route accessed", user: token });
}
