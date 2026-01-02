import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";


export async function POST(request: Request) {
    await dbConnect();
    const { token, email, password } = await request.json();
    try {
        if(!token || !email || !password){
            return Response.json({
                success: false,
                message: 'Missing required fields'
            },{
                status: 400
            });
        }
        
        const user = await UserModel.findOne({ email: email});
        if(!user){
            return Response.json({
                success: false,
                message: 'User not found'
            },{
                status: 400
            });
        }
        const isTokenValid = await bcrypt.compare(token, user.resetToken || '');

        if(!isTokenValid){
            return Response.json({
                success: false,
                message: 'Invalid reset token'
            },{
                status: 400
            }); 
        }

        const now = new Date();
        if(!user.resetTokenExpiry || user.resetTokenExpiry < now){
            return Response.json({
                success: false,
                message: 'Token is expired'
            },{
                status: 400
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();
        return Response.json({
            success: true,
            message: 'Password has been reset successfully'
        },{
            status: 200
        });
    } catch (error) {
        console.error(error);
        return Response.json({
            success: false,
            message: 'Internal server error'
        },{
            status: 500
        });
    }
}
