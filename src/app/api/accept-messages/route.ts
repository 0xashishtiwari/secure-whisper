import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);

    const user: User = session?.user as User;

    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        }, { status: 401 })
    }
    const userId = user._id;
    const { acceptMessages } = await request.json()
    console.log(acceptMessages);
    try {
       const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            isAcceptingMessage: acceptMessages
        }, { new: true });
        console.log(updatedUser);
        if(!updatedUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            message: "User status of accepting messages updated successfully",
            updatedUser
        }, { status: 200 })

    } catch (error) {
        console.log('Failed to update user status of accepting messages');
        return Response.json({
            success: false,
            message: "Failed to update user status of accepting messages"
        }, { status: 500
        })
    }

}

export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;
    if (!session || !session.user) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        }, { status: 401 })
    }
    const userId = user._id;
    try {
        const existingUser = await UserModel.findById(userId);
        if (!existingUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }

        return Response.json({
            success: true,
            message: "User status of accepting messages fetched successfully",
            isAcceptingMessages: existingUser.isAcceptingMessage
        }, { status: 200
        })

    } catch (error) {
        console.log('Failed to get user status of accepting messages');
        return Response.json({
            success: false,
            message: "Error in getting user status of accepting messages"
        }, { status: 500
        })
    }
}