import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export default function AgregarInventarioModal({ show, handleClose, onAgregar }) {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  const guardarMedicamento = () => {
    if (!nombre || !codigo) {
      alert("Por favor complete al menos el código y el nombre.");
      return;
    }

    onAgregar({
      codigo,
      nombre,
      cantidad,
      fechaVencimiento,
      estado: "Stock normal", 
    });

    
    setCodigo("");
    setNombre("");
    setCantidad("");
    setFechaVencimiento("");
    
   
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar al Inventario</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. 0100450"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del medicamento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Ibuprofeno"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="0"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Vencimiento</Form.Label>
                <Form.Control
                  type="date"
                  value={fechaVencimiento}
                  onChange={(e) => setFechaVencimiento(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={guardarMedicamento}>
          Agregar al inventario
        </Button>
      </Modal.Footer>
    </Modal>
  );
}