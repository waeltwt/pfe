import { Form } from "react-bootstrap";

const InputGroup = ({ label, type, name, onChangeHandler, errors, value, isInvalid, required }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChangeHandler}
        isInvalid={isInvalid} // Utilisez la prop Bootstrap `isInvalid`
        required={required}
      />
      {isInvalid && <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>}
    </Form.Group>
  );
};

export default InputGroup;
