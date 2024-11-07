import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import { Tabs, Tab, Box } from "@mui/material";

// Define the structure of the fight data
interface Fight {
  matchup: [string, string]; // Array containing two fighter names
  tale_of_the_tape: {
    [key: string]: {
      [fighterName: string]: string;
    };
  };
}

const HomePage: React.FC = () => {
  const [fights, setFights] = useState<Fight[]>([]);
  const [upcomingFights, setUpcomingFights] = useState<Fight[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<number>(0);

  //getting the api for recent fights
  useEffect(() => {
    async function fetchFights() {
      const options = {
        method: "GET",
        url: "https://mma-stats.p.rapidapi.com/September_14_2024",
        headers: {
          "x-rapidapi-key":
            "511fdf43ebmsh7a179f82558f1b5p145ef3jsn80b50bfe3a92",
          "x-rapidapi-host": "mma-stats.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);

        console.log("Full Response:", response);
        console.log("Fight Data:", response.data);

        setFights(response.data);
        //upcoming fights
        const scrapedUpcomingFights = await axios.get("/api/upcoming-fights"); // Call your scraping script's API
        console.log("Upcoming Fights:", scrapedUpcomingFights.data);
        setUpcomingFights(scrapedUpcomingFights.data);
      } catch (error) {
        console.error("Error fetching fight data:", error);
        setError("Failed to fetch fight data.");
      } finally {
        setLoading(false);
      }
    }

    fetchFights();
  }, []);

  const filteredFights = fights.filter((fight) =>
    fight.matchup.some((name) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const filteredUpcomingFights = upcomingFights.filter((fight) =>
    fight.matchup.some((name) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MMA Fighter Hub</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <h2>Recent Fights</h2>

      {loading ? (
        <p>Loading recent fights...</p>
      ) : error ? (
        <p>{error}</p>
      ) : fights.length === 0 ? (
        <p>No fights available.</p>
      ) : (
        <ul>
          {fights.map((fight, index) => (
            <li key={index}>
              <h3>
                {fight.matchup[0]} vs. {fight.matchup[1]}
              </h3>
              <p>
                <strong>Wins/Losses/Draws:</strong>
              </p>
              <ul>
                <li>
                  {fight.matchup[0]}:{" "}
                  {
                    fight.tale_of_the_tape["Wins/Losses/Draws"][
                      fight.matchup[0]
                    ]
                  }
                </li>
                <li>
                  {fight.matchup[1]}:{" "}
                  {
                    fight.tale_of_the_tape["Wins/Losses/Draws"][
                      fight.matchup[1]
                    ]
                  }
                </li>
              </ul>
              <p>
                <strong>Height:</strong>
              </p>
              <ul>
                <li>
                  {fight.matchup[0]}:{" "}
                  {fight.tale_of_the_tape["Height"][fight.matchup[0]]}
                </li>
                <li>
                  {fight.matchup[1]}:{" "}
                  {fight.tale_of_the_tape["Height"][fight.matchup[1]]}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
