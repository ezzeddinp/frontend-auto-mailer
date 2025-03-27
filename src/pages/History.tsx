import { useState } from "react";

const History: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "pending" | "failed" | "success">("all");
  const [search, setSearch] = useState("");

  const dummyData = [
    { division: "Marketing", date: "2025-03-25", time: "14:30", status: "success" },
    { division: "HR", date: "2025-03-24", time: "09:15", status: "pending" },
  ];

  const filteredData = dummyData.filter(
    (item) =>
      (filter === "all" || item.status === filter) &&
      item.division.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dark:text-white">
      <h1 className="text-2xl font-bold mb-4">History</h1>
      <p className="mb-6">Showing your all histories with a clear view</p>
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by division"
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        />
        <select
        title="Filter by status"
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="success">Success</option>
        </select>
      </div>
      <div className="space-y-4">
        {filteredData.map((item, index) => (
          <div key={index} className="border p-4 rounded dark:border-gray-600">
            <h3 className="font-bold">{item.division}</h3>
            <p>{item.date}</p>
            <p>{item.time}</p>
            <p
              className={
                item.status === "success"
                  ? "text-green-500"
                  : item.status === "pending"
                  ? "text-yellow-500"
                  : "text-red-500"
              }
            >
              {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;