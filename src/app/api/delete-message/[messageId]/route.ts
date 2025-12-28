import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/options"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { NextResponse } from "next/server"
import mongoose from "mongoose"

export async function DELETE(
  request: Request,
  context: { params: Promise<{ messageId: string }> }
) {
  const { messageId } = await context.params
    
  await dbConnect()

  const session = await getServerSession(authOptions)

  if (!session?.user?._id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    )
  }

  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    return NextResponse.json(
      { success: false, message: "Invalid message ID" },
      { status: 400 }
    )
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: session.user._id },
      {
        $pull: {
          message: { _id: new mongoose.Types.ObjectId(messageId) },
        },
      }
    )

    if(updateResult.acknowledged === false) {
        return NextResponse.json({
            success: false,
            message: "Failed to delete message"
        }, { status: 500
        })
    }

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message deleted successfully",
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error deleting message for user", error)
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting message for user",
      },
      { status: 500 }
    )
  }
}
