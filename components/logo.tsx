import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
  }

  const logoSize = sizes[size]

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative" style={{ width: logoSize, height: logoSize }}>
        <Image src="/logo.png" alt="Fathia Logo" width={logoSize} height={logoSize} priority />
      </div>
      {showText && (
        <span className={`ml-2 font-bold ${size === "lg" ? "text-2xl" : size === "md" ? "text-xl" : "text-base"}`}>
          Fathia
        </span>
      )}
    </div>
  )
}

export function LogoLink({ size = "md", showText = true, className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Logo size={size} showText={showText} />
    </Link>
  )
}
