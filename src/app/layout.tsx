import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'POS - Sistema de Ventas',
  description: 'Sistema POS simple con facturación',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}