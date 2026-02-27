import React from 'react';
import '../../assets/css/my-css/editTimeForOneSoccerField.css';

const Panel = ({ data, onClose }) => {
  return (
    <div className="panel-overlay">
      <div className="panel">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Tarih Düzenleme Paneli</h2>
        {data ? (
          <div>
            <p>
              <strong>Saha Adı:</strong> {data.soccerName}
            </p>
            <p>
              <strong>Lokasyon:</strong> {data.location}
            </p>
          </div>
        ) : (
          <p>Düzenlenecek veri bulunamadı.</p>
        )}
        <form>
          <div>
            <label htmlFor="dateInput">Tarih:</label>
            <input id="dateInput" type="date" />
          </div>
          <button type="submit">Kaydet</button>
        </form>
      </div>
    </div>
  );
};

export default Panel;
