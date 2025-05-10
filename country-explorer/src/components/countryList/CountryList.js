import { Row, Col } from 'react-bootstrap';
import CountryCard from '../countryCard/CountryCard';

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

