import "./CountryCard.css";
import { Card, Button } from "react-bootstrap";

/**
 * Reusable card component for displaying country summary
 * @param {Object} props - Component properties
 * @param {Country} props.country - Country data object from API
 * @param {Function} props.onSelect - Callback when user clicks "View Details"
 */

const CountryCard = ({ country, onSelect }) => {
  return (
    <Card className="country-card">
      <Card.Img
        variant="top"
        src={country.flags?.png}
        alt={`Flag of ${country.name.official}`}
      />
      <Card.Body>
        <Card.Title>{country.name.official}</Card.Title>
        <Card.Text>
          Region: {country.region} <br />
          Population: {country.population.toLocaleString()}
        </Card.Text>
        <Button
          className="view-details-button"
          onClick={() => onSelect(country)}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CountryCard;
