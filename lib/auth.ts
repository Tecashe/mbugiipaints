import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import { prisma } from "@/lib/prisma"

export interface AuthUser {
  id: string
  email: string
  name: string | null
  role: "USER" | "ADMIN"
  avatar: string | null
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return null
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret") as {
      userId: string
      email: string
      role: string
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
      },
    })

    return user as AuthUser | null
  } catch (error) {
    console.error("Auth verification error:", error)
    return null
  }
}

export function requireAuth(handler: (request: NextRequest, user: AuthUser) => Promise<Response>) {
  return async (request: NextRequest) => {
    const user = await getAuthUser(request)

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    return handler(request, user)
  }
}

export function requireAdmin(handler: (request: NextRequest, user: AuthUser) => Promise<Response>) {
  return async (request: NextRequest) => {
    const user = await getAuthUser(request)

    if (!user || user.role !== "ADMIN") {
      return new Response(JSON.stringify({ error: "Admin access required" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      })
    }

    return handler(request, user)
  }
}
