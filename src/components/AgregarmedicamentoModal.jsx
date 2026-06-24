import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

export default function AgregarMedicamentoModal({
  show,
  handleClose,
  onAgregar,
}) {
  const [medicamento, setMedicamento] = useState("");
  const [dosis, setDosis] = useState("");
  const [frecuencia, setFrecuencia] = useState("");
  const [duracion, setDuracion] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [indicaciones, setIndicaciones] = useState("");

  const limpiarFormulario = () => {
    setMedicamento("");
    setDosis("");
    setFrecuencia("");
    setDuracion("");
    setCantidad("");
    setIndicaciones("");
  };

  const agregarMedicamento = () => {
    if (!medicamento) return;

    onAgregar({
      medicamento,
      dosis,
      frecuencia,
      duracion,
      cantidad,
      indicaciones,
    });

    limpiarFormulario();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Agregar medicamento</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Medicamento</Form.Label>

            {/* Más adelante puedes reemplazar este select
                por un buscador conectado a Supabase */}
            <Form.Select
              value={medicamento}
              onChange={(e) => setMedicamento(e.target.value)}
            >
              <option value="">Seleccione un medicamento</option>
              <option value="Paracetamol 500 mg">
                Paracetamol 500 mg
              </option>
              <option value="Ibuprofeno 400 mg">
                Ibuprofeno 400 mg
              </option>
              <option value="Amoxicilina 500 mg">
                Amoxicilina 500 mg
              </option>
            </Form.Select>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Dosis</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. 1 tableta"
                  value={dosis}
                  onChange={(e) => setDosis(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Frecuencia</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. Cada 8 horas"
                  value={frecuencia}
                  onChange={(e) => setFrecuencia(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Duración</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ej. 5 días"
                  value={duracion}
                  onChange={(e) => setDuracion(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  placeholder="Cantidad"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group>
            <Form.Label>Indicaciones específicas (opcional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ej. Tomar después de las comidas."
              value={indicaciones}
              onChange={(e) => setIndicaciones(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>

        <Button variant="success" onClick={agregarMedicamento}>
          Agregar medicamento
        </Button>
      </Modal.Footer>
    </Modal>
  );
}