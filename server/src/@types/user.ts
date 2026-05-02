import formidable from "formidable";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        name: string;
        email: string;
        verified: boolean;
        avatar?: string;
        followers: number;
        followings: number;
      };
      token: string;
      files?: { [key: string]: formidable.File };
    }
  }
}

export interface CreateUser {
  body: {
    name: string;
    email: string;
    password: string;
  };
}

export interface VerifyEmailRequest {
  body: {
    token: string;
    userId: string;
  };
}