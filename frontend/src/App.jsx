// Importation des composants de React Router
import { Navigate, Route, Routes } from "react-router-dom";

// Importation du contexte de l'application
import { AppProvider } from "./context/AppContext.jsx";

// Importation du hook personnalisé du contexte
import { useApp } from "./context/useApp.js";

// Importation des composants communs
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Importation des pages
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Announcements from "./pages/Announcements.jsx";
import ExchangeRequests from "./pages/ExchangeRequests.jsx";
import Appointments from "./pages/Appointments.jsx";
import Notifications from "./pages/Notifications.jsx";
import Messages from "./pages/Messages.jsx";

// Gestion des routes de l'application
function AppContent() {
    const { token, message } = useApp();

    return (
        <div>
            <Navbar />

            <Routes>
                <Route path="/" element={<Navigate to={token ? "/profile" : "/login"} replace />} />

                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                <Route path="/announcements" element={<ProtectedRoute><Announcements /></ProtectedRoute>} />

                <Route path="/exchange-requests" element={<ProtectedRoute><ExchangeRequests /></ProtectedRoute>} />

                <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />

                <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />

                <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {message && (<p className="form-message" role="status">{message}</p>)}
        </div>
    );
}

// Composant principal de l'application
function App() {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
}

// Exportation du composant principal
export default App;
