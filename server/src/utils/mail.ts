import EmailVerificationToken from "#/models/emailVerification";
import nodemailer from "nodemailer";
import { MAILTRAP_PASS, MAILTRAP_USER, SIGN_IN_URL, VERIFICATION_EMAIL } from "#/utils/variables";
import { generateToken } from "#/utils/helper";
import { generateTemplate } from "#/mail/template";
import path from "path";


const generateMailTransporter = () => {

    //seend verification email here
  const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS
  }
  
});
return transport;

}

interface Profile{
    name: string;
    email: string;
    userId: string;
}

export const sendVerificationEmail = async (token: string, profile: Profile) => {
    const transport = generateMailTransporter();
    const { name, email, userId } = profile;

    const welcomeMessage = `Welcome ${name} to Podify! Please verify your email by clicking the button below.`;

    //  await al sendMail
    await transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        html: generateTemplate({
            title: "Welcome to Podify",
            message: welcomeMessage,
            logo: "cid:logo",
            banner: "cid:welcome",
            link: "#",
            btnTitle: token
        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/logo.jpg"),
                cid: "logo"
            },
            {
                filename: "welcome.png",
                path: path.join(__dirname, "../mail/welcome.jpg"),
                cid: "welcome"
            },
        ]
    });
};

interface Options{
    email: string;
    link:string;
}


export const sendForgetPasswordLink = async (options: Options) => {
    const transport = generateMailTransporter();
    const {  email, link } = options;

    const message = `We just received a request to reset your password for your Podify account.`;

    //  await al sendMail
    await transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        subject: "Password Reset Request",
        html: generateTemplate({
            title: "Forget Password Request",
            message,
            logo: "cid:logo",
            banner: "cid:forget_password.jpg",
            link,
            btnTitle: "Reset Password"
        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/forget_password.jpg"),
                cid: "logo"
            },
            {
                filename: "forget_password.png",
                path: path.join(__dirname, "../mail/forget_password.jpg"),
                cid: "forget_password.jpg"
            },
        ]
    });
};


export const sendPasswordResetSuccessEmail = async (name: string, email: string) => {
    const transport = generateMailTransporter();


    const message = `Dear ${name}, your password has been reset successfully.`;

    //  await al sendMail
    await transport.sendMail({
        to: email,
        from: VERIFICATION_EMAIL,
        subject: "Password Reset Successfully",
        html: generateTemplate({
            title: "Password Reset Successfully",
            message,
            logo: "cid:logo",
            banner: "cid:forget_password.jpg",
            link: SIGN_IN_URL,
            btnTitle: "Log In"
        }),
        attachments: [
            {
                filename: "logo.png",
                path: path.join(__dirname, "../mail/forget_password.jpg"),
                cid: "logo"
            },
            {
                filename: "forget_password.png",
                path: path.join(__dirname, "../mail/forget_password.jpg"),
                cid: "forget_password.jpg"
            },
        ]
    });
};


