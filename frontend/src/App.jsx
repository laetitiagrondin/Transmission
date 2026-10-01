import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error("Erreur lors de l'appel à l'API :", error);
      });
  }, []);

  return (
      <main>
          <h1>Transmission</h1>
          <p>{message}</p>
      </main>
  );
}

export default App;
