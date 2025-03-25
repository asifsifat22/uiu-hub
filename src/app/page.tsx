import AuthForm from '../components/auth/AuthForm'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-white">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="UIU Logo"
            width={150}
            height={150}
            className="mx-auto"
            priority
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to UIU Hub
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your one-stop campus connection platform
          </p>
        </div>
        <AuthForm />
      </div>
    </main>
  )
}
