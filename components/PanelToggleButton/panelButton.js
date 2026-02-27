import React, { useState } from "react";
import '../../assets/css/my-css/panelButton.css';

function PanelButton({ isPanelOpen, togglePanel }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    togglePanel();
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <button 
      className={`toggle-button ${isPanelOpen ? "open" : "closed"} ${clicked ? "clicked" : ""}`} 
      onClick={handleClick}
    >
      {isPanelOpen ? "Panel Kapat" : "Panel Aç"}
    </button>
  );
}

export default PanelButton;
