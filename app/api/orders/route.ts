import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/auth"

export async function GET(request: NextRequest) {
  return requireAdmin(async (req, user) => {
    try {
      const { searchParams } = new URL(req.url)
      const status = searchParams.get("status")

      const where: any = {}

      if (status && status !== "all") {
        where.status = status.toUpperCase()
      }

      const orders = await prisma.order.findMany({
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
          orderItems: {
            include: {
              artwork: {
                select: {
                  id: true,
                  title: true,
                  images: true,
                },
              },
            },
          },
        },
      })

      return NextResponse.json(orders)
    } catch (error) {
      console.error("Error fetching orders:", error)
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
    }
  })(request)
}

export async function PUT(request: NextRequest) {
  return requireAdmin(async (req, user) => {
    try {
      const { orderId, status } = await req.json()

      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: status.toUpperCase() },
      })

      return NextResponse.json(order)
    } catch (error) {
      console.error("Error updating order:", error)
      return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
    }
  })(request)
}