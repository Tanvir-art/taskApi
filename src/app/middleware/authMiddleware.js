import jwt from 'jsonwebtoken';

const protect = (...allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    // console.log("Token:", token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const { userId, role } = decoded;

      if (allowedRoles.length && !allowedRoles.includes(role)) {
        return res.status(403).json({ message: 'Forbidden: You do not have access' });
      }

      req.user = { id: userId, role };
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  };
};

export default protect;
