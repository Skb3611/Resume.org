import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? process.env.NEXT_PUBLIC_JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

export const signToken = (user:{}) => {
  try {
    return jwt.sign(user, JWT_SECRET, { expiresIn: "2h" });
  } catch (error) {
    console.error("Error signing token:", error);
    return "";
  }
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
 
  } catch (err) {
    console.error("Error verifying token:", err);
    return null;
  }

};
export const decodeToken = (token: string) => {
  try {
    const decoded = jwt.decode(token);
    if (decoded) {
      return decoded; // Successfully decoded payload
    } else {
      console.error("Token is invalid or malformed");
      return null;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};


