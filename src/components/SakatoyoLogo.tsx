import React from "react";

interface SakatoyoLogoProps {
  className?: string;
}

export default function SakatoyoLogo({ className = "h-12 w-12" }: SakatoyoLogoProps) {
  return (
    <img
      src="/logo-spr.png"
      alt="PT. Sakatoyo Prima Resources"
      className={className}
    />
  );
}
