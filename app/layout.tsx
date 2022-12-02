import LeftBar from '../components/left-bar'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-octo-light-yellow">
        <div className="w-full flex flex-row items-center content-center justify-center">
          <div className="w-3/4 flex flex-row border border-red-700 gap-4 p-4">
            <LeftBar />
            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
