import { authOptions } from "../auth/[...nextauth]/options"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import mongoose from "mongoose"

export async function GET() {
  await dbConnect()

  const session = await getServerSession(authOptions)

  if (!session?.user?._id) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    const userId = new mongoose.Types.ObjectId(session.user._id)

    const result = await UserModel.aggregate([
      // 1️⃣ Match user
      { $match: { _id: userId } },

      // 2️⃣ Unwind the CORRECT field
      {
        $unwind: {
          path: "$message",
          preserveNullAndEmptyArrays: true,
        },
      },

      // 3️⃣ Sort by message date
      { $sort: { "message.createdAt": -1 } },

      // 4️⃣ Group back
      {
        $group: {
          _id: "$_id",
          messages: { $push: "$message" },
        },
      },

      // 5️⃣ Remove null entries
      {
        $project: {
          messages: {
            $filter: {
              input: "$messages",
              as: "msg",
              cond: { $ne: ["$$msg", null] },
            },
          },
        },
      },
    ])

    const messages = result[0]?.messages ?? []

    if (messages.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "No messages found",
          messages: [],
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: "Messages retrieved successfully",
        messages,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Failed to get messages for user", error)
    return NextResponse.json(
      { success: false, message: "Failed to get messages for user" },
      { status: 500 }
    )
  }
}
