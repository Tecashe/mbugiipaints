import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy") || "newest"
    const status = searchParams.get("status")
    const featured = searchParams.get("featured")

    const where: any = {}

    if (category && category !== "all") {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { medium: { contains: search, mode: "insensitive" } },
        { tags: { has: search } },
      ]
    }

    if (status) {
      where.status = status.toUpperCase()
    }

    if (featured === "true") {
      where.featured = true
    }

    let orderBy: any = { createdAt: "desc" }

    switch (sortBy) {
      case "price-low":
        orderBy = { price: "asc" }
        break
      case "price-high":
        orderBy = { price: "desc" }
        break
      case "title":
        orderBy = { title: "asc" }
        break
      case "year":
        orderBy = { year: "desc" }
        break
      case "newest":
      default:
        orderBy = { createdAt: "desc" }
        break
    }

    const artworks = await prisma.artwork.findMany({
      where,
      orderBy,
      include: {
        _count: {
          select: { orderItems: true },
        },
      },
    })

    return NextResponse.json(artworks)
  } catch (error) {
    console.error("Error fetching artworks:", error)
    return NextResponse.json({ error: "Failed to fetch artworks" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const artwork = await prisma.artwork.create({
      data: {
        title: data.title,
        description: data.description,
        price: Number.parseFloat(data.price),
        category: data.category,
        medium: data.medium,
        dimensions: data.dimensions,
        year: Number.parseInt(data.year),
        images: data.images || [],
        status: data.status || "AVAILABLE",
        featured: data.featured || false,
        tags: data.tags || [],
      },
    })

    return NextResponse.json(artwork, { status: 201 })
  } catch (error) {
    console.error("Error creating artwork:", error)
    return NextResponse.json({ error: "Failed to create artwork" }, { status: 500 })
  }
}
