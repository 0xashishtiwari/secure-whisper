import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { generateOtp } from "@/helpers/generateOtp";


export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json()

        const existingUserVerifiedByUsername = await UserModel.findOne({ username, isVerified: true })

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken",
            }, {
                status: 400,
            })
        }
        const existingUserVerifiedByEmail = await UserModel.findOne({ email })
        const verifyCode = generateOtp();

        if (existingUserVerifiedByEmail) {
            if (existingUserVerifiedByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "Email is already registered",
                }, {
                    status: 400,
                })
            }else{
                existingUserVerifiedByEmail.username = username;
                const hashedPassword = await bcrypt.hash(password, 10);
                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1); // 1 hour expiry
                existingUserVerifiedByEmail.password = hashedPassword;
                existingUserVerifiedByEmail.verifyCode = verifyCode;
                existingUserVerifiedByEmail.verifyCodeExpiry = expiryDate;

                await existingUserVerifiedByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1); // 1 hour expiry

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                isVerified: false,
                isAcceptingMessage: true,
                verifyCodeExpiry: expiryDate,
                message: [],
            })

            await newUser.save();
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message,
            }, {
                status: 500,
            })
        }


        return Response.json({
            success: true,
            message: "User registered successfully. Please verify your email.",
        }, {
            status: 201,
        })
    } catch (error) {
        console.error("Error in registering user", error);
        return Response.json({
            success: false,
            message: "Error registering user",
        }, {
            status: 500,
        })
    }
}


