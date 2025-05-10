import "./App.css";
import { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { fetchAllCountries } from "./services/api";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import SearchBar from "./components/SearchBar";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const data = await fetchAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCountries(countries);
      return;
    }

    const results = countries.filter((country) =>
      country.name.official.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCountries(results);
  }, [searchTerm, countries]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌍 Country Explorer</h1>
      </header>

      <Container className="my-4">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading &&
          !error &&
          (filteredCountries.length === 0 ? (
            <Alert variant="info">No countries available.</Alert>
          ) : (
            <CountryList
              countries={filteredCountries}
              onSelect={setSelectedCountry}
            />
          ))}
        {selectedCountry && (
          <CountryDetail
            country={selectedCountry}
            allCountries={countries}
            onClose={() => setSelectedCountry(null)}
          />
        )}
      </Container>
    </div>
  );
}

export default App;
