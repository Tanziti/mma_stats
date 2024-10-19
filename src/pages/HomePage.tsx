import React, { useEffect, useState } from "react";

// Define a type for a fight
interface Fight {
  id: string;
  fighter1: string;
  fighter2: string;
  result: string;
  date: string;
}

const HomePage: React.FC = () => {
  const [fights, setFights] = useState<Fight[]>([]);

  // Fetch fights (mock API call)
  useEffect(() => {
    async function fetchFights() {
      const response = await fetch("https://api.example.com/recent-fights");
      const data: Fight[] = await response.json();
      setFights(data);
    }

    fetchFights();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>MMA Fighter Hub</h1>
      <h2>Recent Fights</h2>

      {fights.length === 0 ? (
        <p>Loading recent fights...</p>
      ) : (
        <ul>
          {fights.map((fight) => (
            <li key={fight.id}>
              {fight.fighter1} vs. {fight.fighter2} — {fight.result} on{" "}
              {fight.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
