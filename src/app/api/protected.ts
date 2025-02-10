import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = req.headers["user"];

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return res
    .status(200)
    .json({ message: "Protected data", user: JSON.parse(user as string) });
}
