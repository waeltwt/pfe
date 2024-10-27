import Alert from "react-bootstrap/Alert";

function Alerte({ message, show, setShow }) {
  return (
    <>
      {show && (
        <Alert
          variant="success"
          onClose={() => setShow(false)}
          dismissible
        >
          {message} 
        </Alert>
      )}
    </>
  );
}

export default Alerte;

