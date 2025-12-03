

export function DashboardPage() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Your dashboard content */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold text-lg mb-4">Card Title</h3>
        <p>Your content here</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold text-lg mb-4">Card Title</h3>
        <p>Your content here</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="font-semibold text-lg mb-4">Card Title</h3>
        <p>Your content here</p>
      </div>
    </div>
  );
}
