import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Menu({ reservaciones, agregarReservacion }) {
    const [form, setForm] = useState({
        nombre: '',
        restaurante: 'Ember',
        horario: '6-8pm',
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
        setForm({ nombre: '', restaurante: 'Ember', horario: '6-8pm', cantidad: 1 });
    };

    return (
        <div>
            <form onSubmit={manejarEnvio} className="mb-4">
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
                        <option value="Ember">Ember - restaurante de carnes🥩</option>
                        <option value="Zao">Zao - restaurante japonês 🍣</option>
                        <option value="Grappa">Grappa - restaurante italiano🤌</option>
                        <option value="Larimar">Larimar - restaurante de mariscos🦑</option>
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
                        <option value="6-8pm">6-8pm🌇</option>
                        <option value="8-10pm">8-10pm🌃</option>
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
                <button type="submit" className="btn btn-warning">Reservar</button>
            </form>
            <h3>Reservaciones actuales:</h3>
            <ul className="list-group">
                {reservaciones.map((res, idx) => (
                    <li key={idx} className="list-group-item">
                        {res.nombre} - {res.restaurante} - {res.horario} - {res.cantidad} personas
                    </li>
                ))}
            </ul>
        </div>
    );
}

function App() {
    const [reservaciones, setReservaciones] = useState([]);

    const agregarReservacion = (reservacion) => {
        const { restaurante, horario, cantidad } = reservacion;

        const total = reservaciones.filter(
            (res) => res.restaurante === restaurante && res.horario === horario
        ).reduce((acc, res) => acc + res.cantidad, 0);

        if (total + cantidad > 12) {
            alert('No hay disponibilidad para este horario.');
            return;
        }

        setReservaciones([...reservaciones, reservacion]);
    };

    return (
        <div className="container">
            <Navbar expand="lg" className="mi-navbar">
                <Container className="d-flex justify-content-center">
                    <Navbar.Brand className="text-center">
                        <h4 style={{ fontSize: 45, fontFamily: 'Edwardian Script ITC, cursive' }}>Bienvenidos a Reservaciones</h4>
                        <h4 style={{ fontSize: 80, fontFamily: 'Edwardian Script ITC, cursive', fontWeight: 'bold' }}>Hotel - Senator</h4>
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <div id="background-container">
                <h1 className="text-center my-4">Reservaciones Senator</h1>
                <Menu reservaciones={reservaciones} agregarReservacion={agregarReservacion} />
            </div>
        </div>
    );
}

export default App;
