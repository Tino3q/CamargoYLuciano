
import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import "../Login.css";

function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegistro(e) {
    e.preventDefault();

    if (password !== confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre: nombre,
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Usuario registrado correctamente.");

    console.log(data);

    navigate("/");
  }

  return (
    <div className="login-bg d-flex justify-content-center align-items-center">
      <div className="login-card shadow-lg overflow-hidden">
        <div className="row g-0">

          <div className="col-lg-6 d-none d-lg-flex login-left">
            <div className="text-center">
              <img
                src={logo}
                alt="Logo"
                className="login-logo mb-4"
              />

              <h1 className="text-white fw-bold">
                Crear Cuenta
              </h1>

              <p className="text-light">
                Regístrate para acceder al sistema.
              </p>
            </div>
          </div>

          <div className="col-lg-6 bg-light">
            <div className="login-form-container">

              <h2 className="fw-bold mb-4">
                Registro
              </h2>

              <form onSubmit={handleRegistro}>

                <div className="mb-3">
                  <label className="form-label">
                    Nombre
                  </label>

                  <input
                    className="form-control"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Correo electrónico
                  </label>

                  <input
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Contraseña
                  </label>

                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Confirmar contraseña
                  </label>

                  <input
                    className="form-control"
                    type="password"
                    value={confirmarPassword}
                    onChange={(e) => setConfirmarPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100"
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Crear cuenta"}
                </button>

              </form>

              <div className="text-center mt-4">
                <Link to="/">
                  ¿Ya tienes cuenta? Inicia sesión
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Registro;
