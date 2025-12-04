import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { LayoutDashboard, UserCheck, LogOut } from 'lucide-react'

// Token validation - in production, use environment variable
const ADMIN_TOKEN = process.env.ADMIN_SECRET_TOKEN || 'skyhigh-admin-2026'

interface AdminLayoutProps {
  children: React.ReactNode
  params: Promise<{ token: string }>
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { token } = await params

  // Validate token
  if (token !== ADMIN_TOKEN) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#0a0a1a]">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-[#000c1f]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={`/admin/${token}`} className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-[#FF7F00]/50 group-hover:ring-[#FF7F00] transition-all">
                <Image
                  src="/logo/SkyHigh_Logo novo.png"
                  alt="SkyHigh AllStar"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-display text-[#FF7F00] leading-none tracking-wider">
                  SKYHIGH
                </h1>
                <p className="text-[10px] font-display text-[#00BFFF] leading-none tracking-widest">
                  ADMIN PANEL
                </p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              <Link
                href={`/admin/${token}`}
                className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-medium"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link
                href={`/admin/${token}/checkin`}
                className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-all text-sm font-medium"
              >
                <UserCheck className="w-4 h-4" />
                <span className="hidden sm:inline">Check-in</span>
              </Link>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg transition-all text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sair</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }) {
  return {
    title: 'Admin Panel - SkyHigh AllStar',
    description: 'Painel administrativo do Tryout SkyHigh AllStar 2026',
    robots: 'noindex, nofollow',
  }
}

