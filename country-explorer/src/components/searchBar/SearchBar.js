import "./SearchBar.css";
import { Form, InputGroup, Button } from "react-bootstrap";
import { BsX } from "react-icons/bs";

/**
 * Interactive search input with clear button functionality.
 * @param {Object} props - Component properties
 * @param {string} props.value - Current search query
 * @param {(value: string) => void} props.onChange - Search term update handler
 */

const SearchBar = ({ value, onChange }) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <div className="search-bar-container">
      <InputGroup className="mb-3">
        <Form.Control
          className="search-bar"
          placeholder="Search country by name..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <Button
            variant="outline-secondary"
            className="clear-button"
            onClick={handleClear}
          >
            <BsX />
          </Button>
        )}
      </InputGroup>
    </div>
  );
};

export default SearchBar;
