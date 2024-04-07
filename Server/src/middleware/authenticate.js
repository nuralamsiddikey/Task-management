import jwt from "jsonwebtoken";

export const IsAuthenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
  
    if (!authHeader)
      return res.status(401).json({
        error: "Access forbidden",
      });

    const token = authHeader.split(" ")[1];
    const secretKey = "SKDFDLK09UU@@@SKDJDHF2233";
    let user;

    user = jwt.verify(token, secretKey);

    if (!user)
      return res.status(401).json({
        error: "Access forbidden",
      });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
