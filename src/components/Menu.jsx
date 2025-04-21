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
                        <option value="Ember" style={{ fontSize: 20, fontFamily: 'Ravie, cursive' }}>
                            Ember - restaurante de carnes🥩
                        </option>
                        <option value="Zao" style={{ fontSize: 20, fontFamily: 'Harlow Solid Italic, cursive' }}>
                            Zao - restaurante japonês 🍣
                        </option>
                        <option value="Grappa" style={{ fontSize: 40, fontFamily: 'Edwardian Script ITC, cursive' }}>
                            Grappa - restaurante italiano🤌
                        </option>
                        <option value="Larimar" style={{ fontSize: 20, fontFamily: 'Jokerman, cursive' }}>
                            Larimar - restaurante de mariscos🦑
                        </option>
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
                <button  type="submit" className="btn btn-warning">Reservar</button>
            </form>
            <h3 style={{ fontSize: 50, fontFamily: 'Edwardian Script ITC, cursive'}}>Reservaciones actuales:</h3>
            <ul className="list-group">
                {reservaciones.map((res, idx) => (
                    <li key={idx} className="list-group-item">
                        {res.nombre} - {res.restaurante} - {res.horario} - {res.cantidad} personas - (👉ﾟヮﾟ)👉
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Menu;
