import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/User";


export async function POST(request: Request) {
    await dbConnect();
    const {username , content} = await request.json();
    try {
        const user = await UserModel.findOne({ username: username });
        if(!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 })
        }
        // Check if user is accepting messages
        if(!user.isAcceptingMessage) {
            return Response.json({
                success: false,
                message: "User is not accepting messages at the moment"
            }, { status: 403 })
        }

        const newMessage  = { content: content };
        user.message.push(newMessage as Message);
        await user.save();

        return Response.json({
            success: true,
            message: "Message sent successfully"
        }, { status: 200 })

    } catch (error) {
        console.log('Error occured while sending messages:', error);
        return Response.json({
            success: false,
            message: "Internal Server Error"
        }, { status: 500 })
    }
}