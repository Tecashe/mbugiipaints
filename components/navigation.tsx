"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Palette,
  User,
  ShoppingBag,
  BookOpen,
  MessageCircle,
  Home,
  LogOut,
  FileText,
  Star,
} from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated")
      setIsAuthenticated(authStatus === "true")
    }

    window.addEventListener("scroll", handleScroll)
    checkAuth()

    // Listen for auth changes
    const handleStorageChange = () => checkAuth()
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userRole")
    setIsAuthenticated(false)
    window.location.href = "/"
  }

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/gallery", label: "Gallery", icon: Palette },
    { href: "/classes", label: "Art Classes", icon: BookOpen },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
    { href: "/blog", label: "Blog", icon: FileText },
    { href: "/testimonials", label: "Reviews", icon: Star },
    { href: "/about", label: "About", icon: User },
    { href: "/contact", label: "Contact", icon: MessageCircle },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Palette className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-light text-xl tracking-wide">mbugiipaints</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-light tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="font-light tracking-wide bg-transparent">
                    Dashboard
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLogout}
                  className="font-light tracking-wide text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button size="sm" className="font-light tracking-wide">
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border animate-scale-in">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 text-sm font-light tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-200 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              <div className="pt-4 border-t border-border space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link href="/admin" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full font-light tracking-wide bg-transparent">
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="w-full font-light tracking-wide text-muted-foreground hover:text-foreground"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button size="sm" className="w-full font-light tracking-wide">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
