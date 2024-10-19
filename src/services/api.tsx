const API_BASE_URL = "https://some-ufc-api.com"; // Placeholder API URL

export async function fetchRecentFights() {
  const response = await fetch(`${API_BASE_URL}/fights/recent`);
  return response.json();
}

export async function fetchFighterDetails(id) {
  const response = await fetch(`${API_BASE_URL}/fighters/${id}`);
  return response.json();
}
