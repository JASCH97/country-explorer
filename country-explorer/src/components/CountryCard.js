import { Card, Button } from 'react-bootstrap';

const CountryCard = ({ country, onSelect }) => {
  return (
    <Card>
      <Card.Img variant="top" src={country.flags?.png} alt={`Flag of ${country.name.official}`} />
      <Card.Body>
        <Card.Title>{country.name.official}</Card.Title>
        <Card.Text>
          Region: {country.region} <br />
          Population: {country.population.toLocaleString()}
        </Card.Text>
        <Button variant="primary" onClick={() => onSelect(country)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CountryCard;
