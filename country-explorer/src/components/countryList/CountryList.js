import { Row, Col } from "react-bootstrap";
import CountryCard from "../countryCard/CountryCard";

/**
 * Responsive grid layout for displaying country cards.
 * @param {Object} props - Component properties
 * @param {Country[]} props.countries - Array of country objects to display
 * @param {(country: Country) => void} props.onSelect - Handler for card selection
 */

const CountryList = ({ countries, onSelect }) => {
  return (
    <Row>
      {countries.map((country) => (
        <Col key={country.cca3} sm={6} md={4} lg={3} className="mb-4">
          <CountryCard country={country} onSelect={onSelect} />
        </Col>
      ))}
    </Row>
  );
};

export default CountryList;
