import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { FiPlusCircle, FiEdit } from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import AgregarInventarioModal from "../components/AgregarInventarioModal"; 

function Inventario() {
  const [user, setUser] = useState(null);
  
  
  const [showModal, setShowModal] = useState(false);

 
  const [medicamentos, setMedicamentos] = useState([
    {
      codigo: "0100032",
      nombre: "Amoxicilina",
      cantidad: 1,
      fechaVencimiento: "27/11/2030",
      estado: "A punto de agotarse",
    },
    {
      codigo: "0100110",
      nombre: "Paracetamol",
      cantidad: 2,
      fechaVencimiento: "14/12/2029",
      estado: "A punto de agotarse",
    },
    {
      codigo: "0100102",
      nombre: "Vitamina C",
      cantidad: 1,
      fechaVencimiento: "2/1/2029",
      estado: "A punto de agotarse",
    },
  ]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

 
  const handleAgregarMedicamento = (nuevoMedicamento) => {
    setMedicamentos([...medicamentos, nuevoMedicamento]);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Topbar user={user} />

        <main className="container-fluid py-4 px-4">
          <div className="mb-4">
            <h2 className="fw-bold">Inventario</h2>
            <p className="text-muted">
              Gestione y controle el stock de medicamentos de la clínica.
            </p>
          </div>

          <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "15px" }}>
            <div className="card-body p-5 text-center">
              <h4 className="fw-bold mb-4">Control de inventario de medicamentos</h4>
              
              <div className="d-flex justify-content-center flex-wrap gap-3">
                {/* Le agregamos el onClick para abrir el modal */}
                <button 
                  onClick={() => setShowModal(true)}
                  className="btn d-flex align-items-center gap-2 px-4 py-2 shadow-sm"
                  style={{ 
                    backgroundColor: "#e8f5e9", 
                    color: "#2e7d32",           
                    borderRadius: "12px", 
                    border: "none", 
                    fontWeight: "600" 
                  }}
                >
                  <FiPlusCircle size={20} /> Agregar medicamento
                </button>

                
                <button 
                  onClick={() => alert("La función de modificar estará disponible pronto.")}
                  className="btn d-flex align-items-center gap-2 px-4 py-2 shadow-sm"
                  style={{ 
                    backgroundColor: "#f5f5f5", 
                    color: "#1976d2",           
                    borderRadius: "12px", 
                    border: "none", 
                    fontWeight: "600" 
                  }}
                >
                  <FiEdit size={20} /> Modificar
                </button>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0" style={{ borderRadius: "15px" }}>
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4 text-center">Medicamentos en sistema</h4>

              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0" style={{ backgroundColor: "#eef2f7" }}>
                  <thead style={{ backgroundColor: "#dce3ec" }}>
                    <tr>
                      <th className="py-3 px-4 border-bottom-0 rounded-start">Codigo</th>
                      <th className="py-3 px-4 border-bottom-0">Nombre medicamento</th>
                      <th className="py-3 px-4 border-bottom-0 text-center">Cantidad</th>
                      <th className="py-3 px-4 border-bottom-0">Fecha vencimiento</th>
                      <th className="py-3 px-4 border-bottom-0 rounded-end">Estado</th>
                    </tr>
                  </thead>

                  <tbody>
                    {medicamentos.map((med, index) => (
                      <tr key={index} className="bg-white">
                        <td className="py-3 px-4 text-muted">{med.codigo}</td>
                        <td className="py-3 px-4 fw-medium">{med.nombre}</td>
                        <td className="py-3 px-4 text-center">{med.cantidad}</td>
                        <td className="py-3 px-4">{med.fechaVencimiento}</td>
                        <td className="py-3 px-4">
                          <div className="d-flex align-items-center gap-2">
                            <span 
                              style={{ 
                                width: "10px", 
                                height: "10px", 
                                backgroundColor: med.estado === "Stock normal" ? "#4caf50" : "#ffb74d", 
                                borderRadius: "50%",
                                display: "inline-block"
                              }}
                            ></span>
                            <span className="small text-muted">{med.estado}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </main>
      </div>

      
      <AgregarInventarioModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        onAgregar={handleAgregarMedicamento} 
      />

    </div>
  );
}

export default Inventario;