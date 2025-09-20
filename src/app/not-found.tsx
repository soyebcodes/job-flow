// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="text-3xl font-bold">404 | Page Not Found</h1>
      <p className="mt-2 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Home
      </a>
    </div>
  );
}
