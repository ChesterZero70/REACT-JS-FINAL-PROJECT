import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./App.css";

function App() {
  const [currentMenu, setCurrentMenu] = useState("inicio");
  const [reservaciones, setReservaciones] = useState([]);

  const cambiarMenu = (menu) => {
    console.log("Cambiando a:", menu);
    setCurrentMenu(menu);
  };

  const agregarReservacion = (reservacion) => {
    const { restaurante, horario, cantidad } = reservacion;

    const total = reservaciones
      .filter(
        (res) => res.restaurante === restaurante && res.horario === horario
      )
      .reduce((acc, res) => acc + res.cantidad, 0);

    if (total + cantidad > 12) {
      alert("No hay disponibilidad para este horario.");
      return;
    }

    setReservaciones([...reservaciones, reservacion]);
  };

  return (
    <div id="background-container">
      <Navbar expand="lg" className="mi-navbar">
        <Container className="d-flex justify-content-center">
          <Navbar.Brand className="text-center">
            <h4 style={{ fontSize: 45, fontFamily: "Edwardian Script ITC, cursive" }}>
              Reservaciones - Hotel
            </h4>
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="menu-container">
        {currentMenu === "inicio" && (
          <>
            <h2 className="text-center my-4">Menú Principal</h2>
            <Row>
              <Col md={6} className="mb-4">
                <Button
                  variant="warning"
                  className="btn-block"
                  style={{ fontSize: "20px" }}
                  onClick={() => cambiarMenu("reservar")}
                >
                  Realizar Reservación
                </Button>
              </Col>
              <Col md={6} className="mb-4">
                <Button
                  variant="warning"
                  className="btn-block"
                  style={{ fontSize: "20px" }}
                  onClick={() => cambiarMenu("verReservaciones")}
                >
                  Ver Reservaciones
                </Button>
              </Col>
            </Row>
          </>
        )}

        {currentMenu === "reservar" && (
          <Menu agregarReservacion={agregarReservacion} setCurrentMenu={cambiarMenu} />
        )}
        {currentMenu === "verReservaciones" && (
          <Reservaciones reservaciones={reservaciones} setCurrentMenu={cambiarMenu} />
        )}
      </Container>
    </div>
  );
}

function Menu({ agregarReservacion, setCurrentMenu }) {
  const [form, setForm] = useState({
    nombre: "",
    restaurante: "Ember",
    horario: "6-8pm",
    cantidad: 1,
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    agregarReservacion({
      ...form,
      cantidad: parseInt(form.cantidad),
    });
    setForm({ nombre: "", restaurante: "Ember", horario: "6-8pm", cantidad: 1 });
    setCurrentMenu("inicio");
  };

  return (
    <form onSubmit={manejarEnvio} className="mb-4">
      <h3 className="text-center">Nueva Reservación</h3>
      <div className="mb-3">
        <label className="form-label">Nombre del huésped</label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          value={form.nombre}
          onChange={manejarCambio}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Restaurante</label>
        <select
          className="form-control"
          name="restaurante"
          value={form.restaurante}
          onChange={manejarCambio}
        >
          <option value="Ember">Ember - carnes</option>
          <option value="Zao">Zao - japonês</option>
          <option value="Grappa">Grappa - italiano</option>
          <option value="Larimar">Larimar - mariscos</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Horario</label>
        <select
          className="form-control"
          name="horario"
          value={form.horario}
          onChange={manejarCambio}
        >
          <option value="6-8pm">6-8pm</option>
          <option value="8-10pm">8-10pm</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Cantidad de personas</label>
        <input
          type="number"
          className="form-control"
          name="cantidad"
          value={form.cantidad}
          onChange={manejarCambio}
          min="1"
          max="5"
          required
        />
      </div>
      <button type="submit" className="btn btn-success">Reservar</button>
      <button
        type="button"
        className="btn btn-secondary mx-2"
        onClick={() => setCurrentMenu("inicio")}
      >
        Volver al Menú Principal
      </button>
    </form>
  );
}

function Reservaciones({ reservaciones, setCurrentMenu }) {
  return (
    <div>
      <h3 className="text-center">Reservaciones Actuales</h3>
      <ul className="list-group mb-4">
        {reservaciones.length > 0 ? (
          reservaciones.map((res, idx) => (
            <li key={idx} className="list-group-item">
              {res.nombre} - {res.restaurante} - {res.horario} - {res.cantidad} personas
            </li>
          ))
        ) : (
          <p className="text-center">No hay reservaciones todavía.</p>
        )}
      </ul>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => setCurrentMenu("inicio")}
      >
        Volver al Menú Principal
      </button>
    </div>
  );
}

export default App;
