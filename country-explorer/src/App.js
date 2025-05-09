import "./App.css";
import { useEffect, useState } from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { fetchAllCountries } from "./services/api";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌍 Country Explorer</h1>
      </header>

      <Container className="my-4">
        {loading && <Spinner animation="border" />}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading &&
          !error &&
          (countries.length === 0 ? (
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
