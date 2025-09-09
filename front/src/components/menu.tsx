export default function Menu() {
  return (
    <div className="w-full pt-2 px-4">
      <nav className="w-full">
        <ul className="flex justify-end gap-4 mb-6 text-sm">
          <li>
            <a href="/" className="text-blue-600 hover:underline">
              Create Incident
            </a>
          </li>
          <li>
            <a href="/dashboard" className="text-blue-600 hover:underline">
              Dashboard
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
