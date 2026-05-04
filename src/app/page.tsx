import Link from "next/link"

export default function WelcomePage() {
  return (
    <div className="max-w-sm w-full bg-white rounded-3xl shadow-lg p-6 text-center space-y-6 fade-slide">
      <div className="text-lg font-semibold text-[#a78bfa]">Maaya Care</div>
      
      <div className="p-2">
        <img 
          src="/images/app-hero.png" 
          alt="Hero" 
          className="w-full rounded-2xl object-cover" 
        />
      </div>

      <h1 className="text-2xl font-semibold text-[#222222] leading-snug">
        Your journey, nurtured here.
      </h1>

      <p className="text-sm text-gray-500 leading-relaxed px-2">
        A pregnancy companion that keeps you informed, calm, and connected every step of the way.
      </p>

      <div className="space-y-3 pt-2">
        <Link href="/role" className="block w-full">
          <button className="w-full min-h-[44px] py-3 rounded-xl text-white font-medium bg-gradient-to-r from-[#a78bfa] to-[#5eead4] shadow-md active:scale-[0.97] transition">
            Get Started
          </button>
        </Link>
        <button className="w-full min-h-[44px] py-3 rounded-xl border border-gray-300 text-gray-600 active:scale-[0.97] transition">
          Log In
        </button>
      </div>
    </div>
  )
}
