import { useEffect, useState } from "react";
import "./App.css";

// Beispiel-API (öffentliche JSON-Daten)
const API_URL = "https://jsonplaceholder.typicode.com/users";

function App() {
  const [users, setUsers] = useState([]);       // Gespeicherte Daten
  const [loading, setLoading] = useState(true); // Ladezustand
  const [error, setError] = useState(null);     // Fehlerzustand
  const [search, setSearch] = useState("");     // Suchfeld

  // Daten beim Laden der Komponente abrufen
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP-Fehler: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Gefilterte Liste basierend auf Suchfeld
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="loading">Lade Daten...</p>;
  if (error) return <p className="error">Fehler: {error}</p>;

  return (
    <div className="app-container">
      <h1>Benutzerliste</h1>

      {/* Suchfeld */}
      <input
        type="text"
        className="search-input"
        placeholder="Suche nach Name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Liste */}
      {filteredUsers.length === 0 ? (
        <p className="no-results">Keine Benutzer gefunden</p>
      ) : (
        <ul className="user-list">
          {filteredUsers.map(user => (
            <li key={user.id}>
              <strong>{user.name}</strong>
              {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

