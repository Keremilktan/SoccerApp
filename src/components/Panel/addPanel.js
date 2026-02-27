import React, { useState } from "react";
import soccerService from "../../services/AdminPageService/AddPanel/addSoccerService.js";
import "../../assets/css/my-css/addPanel.css";

function AddPanelPage({ togglePanel }) {
  const [formData, setFormData] = useState({
    soccerName: "",
    location: ""
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.soccerName.trim()) {
      newErrors.soccerName = "Saha adı gereklidir.";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Konum gereklidir.";
    }
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form Data:", formData);
    const result = await soccerService.postOneSoccerField(formData);
    if (result) {
      console.log("Backend Response:", result);
      togglePanel();
    } else {
      console.error("Veri gönderilirken hata oluştu.");
    }
  };

  return (
    <div className="panel-overlay">
      <div className="panel-container">
        <h6>Panel Sayfası</h6>
        <p>Lütfen eklemek istediğiniz sahayı giriniz.</p>

        <div className="form-group">
          <label>Saha Adı:</label>
          <input
            type="text"
            name="soccerName"
            value={formData.soccerName}
            onChange={handleChange}
          />
          {errors.soccerName && (
            <div className="error">{errors.soccerName}</div>
          )}
        </div>

        <div className="form-group">
          <label>Konum:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && (
            <div className="error">{errors.location}</div>
          )}
        </div>

        <div className="button-group">
          <button onClick={handleSubmit}>Ekle</button>
          <button className="back-button" onClick={togglePanel}>
            Geri Dön
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPanelPage;
