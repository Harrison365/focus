import "./App.css";
import Box from "./Box";
import Modal from "../src/Modal";
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(true);
  return (
    <div className="app-main">
      <Box setShowModal={setShowModal} />
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default App;
