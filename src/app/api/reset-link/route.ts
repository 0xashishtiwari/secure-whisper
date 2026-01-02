import { sendPasswordResetLink } from "@/helpers/sendPasswordResetLink";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";


export async function POST(request: Request) {
    await dbConnect();
    try {
        const { email } = await request.json();
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return Response.json({
                success: false,
                message: 'User with this email does not exist'
            }, {
                status: 404
            });
        }
        // Generate reset token and expiry
        const resetToken = randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
        const hashedResetToken = await bcrypt.hash(resetToken, 10);
        user.resetToken = hashedResetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();
        // Here you would typically send the reset link via email to the user
        const host = request.headers.get('host');
        const protocol = host?.includes('localhost') ? 'http' : 'https';
        const baseUrl = `${protocol}://${host}`;
        const resetLink = `${baseUrl}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
        // Send reset link email
        const result = await sendPasswordResetLink(email, resetLink);

        if (!result.success) {
            return Response.json({
                success: false,
                message: 'Failed to send reset link email'
            }, {
                status: 500
            });
        }
        
        return Response.json({
            success: true,
            message: 'Reset link has been sent to your email'
        },{
            status: 200
        });
    } catch (error) {
        console.log('Error in sending reset link', error);
        return Response.json({
            success: false,
            message: 'Internal server error'
        },{
            status: 500
        });
    }
}