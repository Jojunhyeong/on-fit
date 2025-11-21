'use client'

import { useState } from "react"
import Header from "@/components/common/Header"
import BottomNav from "@/components/common/BottomNav"
import LocationModal from "@/components/header/LocationModal"
import { MapPin, Bell, Sun, Divide } from "lucide-react"
import AuthControls from "@/components/header/AuthControls"
import { usePathname } from "next/navigation";
import Image from "next/image"

export default function MainLayoutShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isPost = pathname.startsWith('/post')
  const isChatRoot = pathname === '/chat'          //  딱 /chat만
  const isChatOther = pathname.startsWith('/chat') && !isChatRoot // /chat/... 전부
  const isCalendar = pathname.startsWith('/calendar') 

  return (
    <div className={isChatOther ? "" : "mb-24"}>
      {/* 헤더 */}
      {isPost ? (
        <Header
          variant="back"
          title="목록으로"
          containerClassName="bg-card/80 backdrop-blur-sm border-b border-border"
        />
      ) : (isChatOther || isCalendar) ? null : ( // /chat/... 에서는 헤더 숨김, /chat 은 보임
        <Header
          variant="main"
          left={
            <Image src="/logo.png" alt="로고" width={100} height={40} className="object-cover h-8"/>
          }
          titleClassName="text-2xl text-gradient-brand font-bold"
          containerClassName="bg-card/80 backdrop-blur-sm border-b border-border"
          right={
            <div className="flex items-center gap-3 md:gap-5 absolute right-3">
              <MapPin className="w-5 h-5 cursor-pointer" onClick={() => setOpen(true)} />
              <Bell className="w-5 h-5" />
              <AuthControls />
            </div>
          }
        />
      )}

      <div>
        {children}
        <LocationModal open={open} onClose={() => setOpen(false)} />
      </div>

      {/* BottomNav: /post 나 /chat/... 에서는 숨김, /chat 은 보임 */}
      {(isPost || isChatOther) ? null : <BottomNav />}
    </div>
  )
}
