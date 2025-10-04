import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET(request: NextRequest) {
  return requireAdmin(async (req, user) => {
    try {
      const { searchParams } = new URL(req.url)
      const status = searchParams.get("status")
      const type = searchParams.get("type")

      const where: any = {}

      if (status && status !== "all") {
        where.status = status.toUpperCase()
      }

      if (type && type !== "all") {
        where.type = type.toUpperCase()
      }

      const inquiries = await prisma.inquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      })

      return NextResponse.json(inquiries)
    } catch (error) {
      console.error("Error fetching inquiries:", error)
      return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 })
    }
  })(request)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        type: data.type?.toUpperCase() || "GENERAL",
        status: "UNREAD",
        priority: data.priority?.toUpperCase() || "MEDIUM",
        userId: data.userId,
      },
    })

    return NextResponse.json(inquiry, { status: 201 })
  } catch (error) {
    console.error("Error creating inquiry:", error)
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  return requireAdmin(async (req, user) => {
    try {
      const { inquiryId, status, response } = await req.json()

      const inquiry = await prisma.inquiry.update({
        where: { id: inquiryId },
        data: {
          status: status?.toUpperCase(),
          response: response,
        },
      })

      return NextResponse.json(inquiry)
    } catch (error) {
      console.error("Error updating inquiry:", error)
      return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 })
    }
  })(request)
}