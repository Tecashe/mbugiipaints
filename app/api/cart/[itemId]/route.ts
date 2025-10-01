import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(request: NextRequest, { params }: { params: { itemId: string } }) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Verify the item belongs to the user
    const orderItem = await prisma.orderItem.findFirst({
      where: {
        id: params.itemId,
        order: {
          userId: user.id,
          status: "PENDING",
        },
      },
      include: {
        order: true,
      },
    })

    if (!orderItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    // Delete the item
    await prisma.orderItem.delete({
      where: { id: params.itemId },
    })

    // Update order totals
    const remainingItems = await prisma.orderItem.findMany({
      where: { orderId: orderItem.orderId },
    })

    if (remainingItems.length === 0) {
      // Delete empty order
      await prisma.order.delete({
        where: { id: orderItem.orderId },
      })
    } else {
      // Update totals
      const subtotal = remainingItems.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0)
      const tax = subtotal * 0.08
      const shipping = subtotal > 500 ? 0 : 50
      const total = subtotal + tax + shipping

      await prisma.order.update({
        where: { id: orderItem.orderId },
        data: {
          subtotal,
          tax,
          shipping,
          total,
        },
      })
    }

    return NextResponse.json({ message: "Item removed from cart" })
  } catch (error) {
    console.error("Error removing from cart:", error)
    return NextResponse.json({ error: "Failed to remove from cart" }, { status: 500 })
  }
}
