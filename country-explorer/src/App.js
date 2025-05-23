import "./App.css";
import bgImage from "./assets/logo_CountryExplorer.jpg";
import { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { fetchAllCountries } from "./services/api";
import CountryList from "./components/countryList/CountryList";
import CountryDetail from "./components/countryDetail/CountryDetail";
import SearchBar from "./components/searchBar/SearchBar";

/**
 * Root component for Country Explorer application
 * @returns {JSX.Element} Main application layout
 */

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Fetches country data on component mount
   * @sideeffect Updates countries, filteredCountries, loading, error states
   */

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

  /**
   * Filters countries based on search term
   * @sideeffect Updates filteredCountries
   * @dependency {string} searchTerm - Current search query
   * @dependency {Country[]} countries - Full country list
   */

  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();

    if (!term) {
      setFilteredCountries(countries);
      return;
    }

    const results = countries.filter((country) =>
      country.name.official.toLowerCase().includes(term)
    );

    setFilteredCountries(results);
  }, [searchTerm, countries]);

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "12rem",
        }}
      >
        <h1>Country Explorer</h1>
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
