import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const artwork = await prisma.artwork.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { orderItems: true },
        },
      },
    })

    if (!artwork) {
      return NextResponse.json({ error: "Artwork not found" }, { status: 404 })
    }

    return NextResponse.json(artwork)
  } catch (error) {
    console.error("Error fetching artwork:", error)
    return NextResponse.json({ error: "Failed to fetch artwork" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    const artwork = await prisma.artwork.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        price: data.price ? Number.parseFloat(data.price) : undefined,
        category: data.category,
        medium: data.medium,
        dimensions: data.dimensions,
        year: data.year ? Number.parseInt(data.year) : undefined,
        images: data.images,
        status: data.status,
        featured: data.featured,
        tags: data.tags,
      },
    })

    return NextResponse.json(artwork)
  } catch (error) {
    console.error("Error updating artwork:", error)
    return NextResponse.json({ error: "Failed to update artwork" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.artwork.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Artwork deleted successfully" })
  } catch (error) {
    console.error("Error deleting artwork:", error)
    return NextResponse.json({ error: "Failed to delete artwork" }, { status: 500 })
  }
}
