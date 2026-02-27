import React, { useEffect, useState } from "react";
import api from "../../services/AdminPageService/SoccerFieldService/getSoccerFieldService.js";
import "../../assets/css/my-css/soccerPanel.css";
import soccerImg from '../../assets/img/my-img/soccerImg.png';
import soccerImgHalf from '../../assets/img/my-img/soccerImgHalf.png';

const SoccerFieldsPanel = ({ onFieldSelect }) => { 
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null); 

  useEffect(() => {
    const fetchFields = async () => {
      const data = await api.getAllMainSoccerFields();
      setFields(data);
    };

    fetchFields();
  }, []);

  const handleFieldClick = (fieldId) => {
    setSelectedField(prevSelectedField => prevSelectedField === fieldId ? null : fieldId);
    if (onFieldSelect) onFieldSelect(fieldId);
  };

  return (
    <div className="soccer-panel">
      {fields.map((field) => (
        <div key={field.id} className="soccer-group">
          <div 
            className={`soccer-card ${selectedField === field.id ? 'active' : ''}`} 
            onClick={() => handleFieldClick(field.id)}
          >
            <img 
              src={field.soccerName === "Main Soccer Field" ? soccerImg : soccerImgHalf} 
              alt={field.soccerName} 
              className="soccer-image" 
            />
            <div className="soccer-text">{field.soccerName}</div>
            <div className="soccer-text">{field.personNumX}</div>
          </div>

          {field.subSoccerFields && field.subSoccerFields.length > 0 && field.subSoccerFields.map((subField) => (
            <div 
              key={subField.id} 
              className={`soccer-card ${selectedField === subField.id ? 'active' : ''}`} 
              onClick={() => handleFieldClick(subField.id)}
            >
              <img 
                src={soccerImgHalf} 
                alt={subField.soccerName} 
                className="soccer-image" 
              />
              <div className="soccer-text">{subField.soccerName}</div>
              <div className="soccer-text">{subField.personNumX}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SoccerFieldsPanel;
