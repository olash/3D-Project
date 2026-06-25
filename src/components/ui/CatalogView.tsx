"use client";

const MOCK_DATA = [
  { id: 1, make: "Yamaha", year: 2024, model: "YZF-R1" },
  { id: 2, make: "Ducati", year: 2023, model: "Panigale V4" },
  { id: 3, make: "BMW", year: 2025, model: "S1000RR" },
];

export default function CatalogView() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Select Fairing Model</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {MOCK_DATA.map((item) => (
          <div key={item.id} className="border border-border p-4 rounded-xl bg-card hover:border-accent cursor-pointer transition-colors">
            <h4 className="font-semibold text-lg">{item.make} {item.model}</h4>
            <p className="text-sm text-gray-400">Year: {item.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
