// import { type NextRequest, NextResponse } from "next/server"
// import { prisma } from "@/lib/prisma"

// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const classData = await prisma.class.findUnique({
//       where: { id: params.id },
//       include: {
//         bookings: {
//           include: {
//             user: {
//               select: {
//                 id: true,
//                 name: true,
//                 email: true,
//               },
//             },
//           },
//         },
//         _count: {
//           select: { bookings: true },
//         },
//       },
//     })

//     if (!classData) {
//       return NextResponse.json({ error: "Class not found" }, { status: 404 })
//     }

//     return NextResponse.json(classData)
//   } catch (error) {
//     console.error("Error fetching class:", error)
//     return NextResponse.json({ error: "Failed to fetch class" }, { status: 500 })
//   }
// }

// export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const data = await request.json()

//     const classData = await prisma.class.update({
//       where: { id: params.id },
//       data: {
//         title: data.title,
//         description: data.description,
//         level: data.level ? data.level.toUpperCase() : undefined,
//         duration: data.duration,
//         sessions: data.sessions ? Number.parseInt(data.sessions) : undefined,
//         price: data.price ? Number.parseFloat(data.price) : undefined,
//         maxStudents: data.maxStudents ? Number.parseInt(data.maxStudents) : undefined,
//         schedule: data.schedule,
//         startDate: data.startDate ? new Date(data.startDate) : undefined,
//         endDate: data.endDate ? new Date(data.endDate) : undefined,
//         location: data.location,
//         address: data.address,
//         images: data.images,
//         materials: data.materials,
//         highlights: data.highlights,
//         curriculum: data.curriculum,
//         requirements: data.requirements,
//         included: data.included,
//         status: data.status,
//       },
//     })

//     return NextResponse.json(classData)
//   } catch (error) {
//     console.error("Error updating class:", error)
//     return NextResponse.json({ error: "Failed to update class" }, { status: 500 })
//   }
// }

// export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await prisma.class.delete({
//       where: { id: params.id },
//     })

//     return NextResponse.json({ message: "Class deleted successfully" })
//   } catch (error) {
//     console.error("Error deleting class:", error)
//     return NextResponse.json({ error: "Failed to delete class" }, { status: 500 })
//   }
// }

import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const classData = await prisma.class.findUnique({
      where: { id: params.id },
      include: {
        enrollments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        _count: {
          select: { enrollments: true },
        },
      },
    })

    if (!classData) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 })
    }

    return NextResponse.json(classData)
  } catch (error) {
    console.error("Error fetching class:", error)
    return NextResponse.json({ error: "Failed to fetch class" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()

    const classData = await prisma.class.update({
      where: { id: params.id },
      data: {
        title: data.title,
        description: data.description,
        level: data.level ? data.level.toUpperCase() : undefined,
        duration: data.duration,
        sessions: data.sessions ? Number.parseInt(data.sessions) : undefined,
        price: data.price ? Number.parseFloat(data.price) : undefined,
        maxStudents: data.maxStudents ? Number.parseInt(data.maxStudents) : undefined,
        schedule: data.schedule,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        location: data.location,
        address: data.address,
        image: data.image,
        images: data.images,
        materials: data.materials,
        highlights: data.highlights,
        curriculum: data.curriculum,
        requirements: data.requirements,
        included: data.included,
        status: data.status,
        category: data.category,
      },
    })

    return NextResponse.json(classData)
  } catch (error) {
    console.error("Error updating class:", error)
    return NextResponse.json({ error: "Failed to update class" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.class.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Class deleted successfully" })
  } catch (error) {
    console.error("Error deleting class:", error)
    return NextResponse.json({ error: "Failed to delete class" }, { status: 500 })
  }
}