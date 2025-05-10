import { Form, InputGroup } from "react-bootstrap";

const SearchBar = ({ value, onChange }) => {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Search country by name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
