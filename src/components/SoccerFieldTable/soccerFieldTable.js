import React, { useState } from 'react';
import '../../assets/css/my-css/soccerFieldTable.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DeleteOneSoccerField from '../../services/AdminPageService/SoccerFieldService/deleteSoccerFieldService.js';

const SoccerFieldTable = ({ soccerFields, onRowSelect, onEdit, onDeleteSuccess }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  if (!Array.isArray(soccerFields) || soccerFields.length === 0) {
    return <p>Veri yüklenemedi veya boş.</p>;
  }

  const handleRowSelect = (rowIndex, rowData, isSubRow = false) => {

    if (
      selectedRow &&
      selectedRow.index === rowIndex &&
      selectedRow.type === (isSubRow ? 'sub' : 'main')
    ) {
      setSelectedRow(null);
      if (onRowSelect) onRowSelect(null);
    } else {
      const newSelection = { type: isSubRow ? 'sub' : 'main', index: rowIndex, data: rowData };
      setSelectedRow(newSelection);
      if (onRowSelect) onRowSelect(rowData);
    }
  };

  const handleDelete = async (soccerFieldId) => {
    const result = await DeleteOneSoccerField(soccerFieldId);
    if (result) {

      if (onDeleteSuccess) onDeleteSuccess(soccerFieldId);
    }
  };

  return (
    <div className="table-container">
      <p>Toplam Sahalar: {soccerFields.length}</p>
      <table>
        <thead>
          <tr>
            <th>Soccer-Name</th>
            <th>Soccer-Location</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {soccerFields.map((oneSoccer, index) => (
            <React.Fragment key={oneSoccer.id}>
              <tr
                className={selectedRow?.type === 'main' && selectedRow?.index === index ? 'selected-row' : ''}
                onClick={() => handleRowSelect(index, oneSoccer)}
              >
                <td>{oneSoccer.soccerName}</td>
                <td>{oneSoccer.location}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(oneSoccer.id);
                    }}
                  >
                    <i className="fas fa-edit"></i> Tarih Düzenle
                  </button>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(oneSoccer.id);
                    }}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>

              {oneSoccer.subSoccerFields &&
                Array.isArray(oneSoccer.subSoccerFields) &&
                oneSoccer.subSoccerFields.length > 0 &&
                oneSoccer.subSoccerFields.map((sub, subIndex) => (
                  <tr
                    key={sub.id}
                    className={
                      selectedRow?.type === 'sub' && selectedRow?.index === subIndex
                        ? 'selected-row'
                        : 'sub-soccer-row'
                    }
                    onClick={() => handleRowSelect(subIndex, sub, true)}
                  >
                    <td>↳ {sub.soccerName}</td>
                    <td>{sub.location}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(sub.id);
                        }}
                      >
                        <i className="fas fa-edit"></i> Tarih Düzenle
                      </button>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(sub.id);
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SoccerFieldTable;
