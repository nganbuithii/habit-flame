"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Flame, Heart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [animate, setAnimate] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 flex flex-col items-center justify-center px-4">
      <div className={`max-w-2xl text-center space-y-8 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative">
          <Image
            src="/images/fire.gif"
            alt="Flame Streak"
            width={200}
            height={200}
            className="mx-auto drop-shadow-md animate-bounce-slow"
          />
        </div>

        <h1 className="text-5xl font-pixel bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text drop-shadow-sm">
          Keep The Streak Alive!
        </h1>
        
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-pink-200 shadow-md">
          <p className="text-lg text-zinc-700 mb-3">
            Build adorable habits, one flame at a time! 
          </p>
          <p className="text-pink-500 font-medium flex items-center justify-center gap-2">
            <Heart className="w-4 h-4" fill="currentColor" /> Dont let your fire die out! <Heart className="w-4 h-4" fill="currentColor" />
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="default" className="w-full sm:w-auto bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-pink-700">
              <Flame className="mr-2 w-5 h-5" /> Start Your Streak
            </Button>
          </Link>

          <Link href="/about" className="w-full sm:w-auto">
            <Button variant="ghost" className="w-full sm:w-auto text-pink-500 hover:text-pink-600 hover:bg-pink-100 rounded-xl px-6 py-6 text-lg">
              Learn More
            </Button>
          </Link>
        </div>
        
        <div className="text-xs text-zinc-400 mt-12 flex items-center justify-center gap-1">
          <div className="w-2 h-2 rounded-full bg-pink-300 animate-pulse"></div>
          Made with love for streak-keepers
          <div className="w-2 h-2 rounded-full bg-purple-300 animate-pulse"></div>
        </div>
      </div>
      
    </div>
  )
}