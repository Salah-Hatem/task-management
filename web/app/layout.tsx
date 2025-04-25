import type { Metadata } from "next"
import "../stylesheets/main.scss"

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Task Management App",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="body-center">{children}</body>
    </html>
  )
}
