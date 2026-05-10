interface NewUserResponse {
  id?: string;
  name: string;
  email: string;
  password: string;
}


export type AuthStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    LostPassword: undefined;
    Verification: {userInfo: NewUserResponse};

}