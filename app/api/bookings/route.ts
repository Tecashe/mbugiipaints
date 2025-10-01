import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      include: {
        class: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)

    if (!user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const { classId, notes } = await request.json()

    // Check if class exists and has space
    const classData = await prisma.class.findUnique({
      where: { id: classId },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    })

    if (!classData) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 })
    }

    if (classData.status !== "ACTIVE") {
      return NextResponse.json({ error: "Class is not available for booking" }, { status: 400 })
    }

    if (classData._count.bookings >= classData.maxStudents) {
      return NextResponse.json({ error: "Class is full" }, { status: 400 })
    }

    // Check if user already booked this class
    const existingBooking = await prisma.booking.findFirst({
      where: {
        userId: user.id,
        classId: classId,
      },
    })

    if (existingBooking) {
      return NextResponse.json({ error: "You have already booked this class" }, { status: 400 })
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        classId: classId,
        status: "CONFIRMED",
        notes: notes || null,
        bookedAt: new Date(),
      },
      include: {
        class: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("Error creating booking:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}
