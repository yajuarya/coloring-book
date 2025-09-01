import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-purple-600 mb-4">Page Not Found</h2>
        <p className="text-lg text-purple-800 mb-6">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
        <Link href="/" className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors">
          Go Home
        </Link>
      </div>
    </div>
  )
}
