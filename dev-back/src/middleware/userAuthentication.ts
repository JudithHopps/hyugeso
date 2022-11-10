import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export const userAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      errors: [
        {
          msg: "Header doesn't have any cookie...",
        }
      ]
    });
  }
  else {
    try {
      const userEmail = await jwt.verify(token, "nfb32iur32ibfqfvi3vf932bg932g932");
      // ERROR CODE : payload가 불러와지는지 확인해야 함
      req.body.email = userEmail;
      next();
    }
    catch (err) {
      return res.status(400).json({
        errors: [
          {
            msg: `${(err as any).message}`,
          }
        ]
      });
    }
  }
}