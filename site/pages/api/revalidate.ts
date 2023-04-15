import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/");
    return res.status(200).json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
