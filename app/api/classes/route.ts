import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
//jhygyu
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const level = searchParams.get("level")
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const upcoming = searchParams.get("upcoming")

    const where: any = {}

    if (level && level !== "all") {
      where.level = level.toUpperCase()
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (status) {
      where.status = status.toUpperCase()
    }

    if (upcoming === "true") {
      where.startDate = { gte: new Date() }
    }

    const classes = await prisma.class.findMany({
      where,
      orderBy: { startDate: "asc" },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    })

    return NextResponse.json(classes)
  } catch (error) {
    console.error("Error fetching classes:", error)
    return NextResponse.json({ error: "Failed to fetch classes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const classData = await prisma.class.create({
      data: {
        title: data.title,
        description: data.description,
        level: data.level.toUpperCase(),
        duration: data.duration,
        sessions: Number.parseInt(data.sessions),
        price: Number.parseFloat(data.price),
        maxStudents: Number.parseInt(data.maxStudents),
        schedule: data.schedule,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        location: data.location,
        address: data.address,
        images: data.images || [],
        materials: data.materials,
        highlights: data.highlights || [],
        curriculum: data.curriculum || [],
        requirements: data.requirements || [],
        included: data.included || [],
        status: data.status || "ACTIVE",
      },
    })

    return NextResponse.json(classData, { status: 201 })
  } catch (error) {
    console.error("Error creating class:", error)
    return NextResponse.json({ error: "Failed to create class" }, { status: 500 })
  }
}
