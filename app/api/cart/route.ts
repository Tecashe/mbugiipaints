import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Get user's pending order (cart)
    const cart = await prisma.order.findFirst({
      where: {
        userId: user.id,
        status: "PENDING",
      },
      include: {
        orderItems: {
          include: {
            artwork: true,
          },
        },
      },
    })

    return NextResponse.json(cart || { orderItems: [] })
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { artworkId, quantity = 1 } = await request.json()

    // Get or create pending order
    let order = await prisma.order.findFirst({
      where: {
        userId: user.id,
        status: "PENDING",
      },
    })

    if (!order) {
      order = await prisma.order.create({
        data: {
          userId: user.id,
          status: "PENDING",
          total: 0,
          subtotal: 0,
          shippingAddress: {},
          billingAddress: {},
        },
      })
    }

    // Get artwork details
    const artwork = await prisma.artwork.findUnique({
      where: { id: artworkId },
    })

    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    if (artwork.status !== "AVAILABLE") {
      return NextResponse.json({ error: "Artwork is not available" }, { status: 400 })
    }

    // Check if item already in cart
    const existingItem = await prisma.orderItem.findFirst({
      where: {
        orderId: order.id,
        artworkId: artworkId,
      },
    })

    if (existingItem) {
      return NextResponse.json({ error: "Item already in cart" }, { status: 400 })
    }

    // Add item to cart
    const orderItem = await prisma.orderItem.create({
      data: {
        orderId: order.id,
        artworkId: artworkId,
        quantity: quantity,
        price: artwork.price,
      },
    })

    // Update order totals
    const orderItems = await prisma.orderItem.findMany({
      where: { orderId: order.id },
      include: { artwork: true },
    })

    const subtotal = orderItems.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.08 // 8% tax
    const shipping = subtotal > 500 ? 0 : 50 // Free shipping over $50
    const total = subtotal + tax + shipping

    await prisma.order.update({
      where: { id: order.id },
      data: {
        subtotal,
        tax,
        shipping,
        total,
      },
    })

    return NextResponse.json(orderItem, { status: 201 })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}
