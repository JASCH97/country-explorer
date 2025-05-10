import "./CountryDetail.css";
import { Modal, Button, ListGroup } from "react-bootstrap";

/**
 * Modal dialog displaying comprehensive country information, including borders resolved from country codes.
 * @param {Object} props - Component properties
 * @param {Country} props.country - Primary country data to display
 * @param {Country[]} props.allCountries - Full country list for border resolution
 * @param {Function} props.onClose - Callback to close the modal
 */

const CountryDetail = ({ country, allCountries, onClose }) => {
  if (!country) return null;

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "N/A";

  const borderNames = country.borders
    ? country.borders
        .map(
          (code) =>
            allCountries.find((c) => c.cca3 === code)?.name.common || code
        )
        .join(", ")
    : "None";

  return (
    <Modal
      show={true}
      onHide={onClose}
      size="lg"
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{country.name.official}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img src={country.flags?.png} alt="Flag" style={{ width: "100px" }} />
        <ListGroup variant="flush" className="mt-3">
          <ListGroup.Item>
            <strong>Common Name:</strong> {country.name.common}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Capital:</strong> {country.capital?.join(", ") || "N/A"}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Region:</strong> {country.region}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Subregion:</strong> {country.subregion}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Languages:</strong> {languages}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Currencies:</strong> {currencies}
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Borders:</strong> {borderNames}
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button className="close-button" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CountryDetail;
