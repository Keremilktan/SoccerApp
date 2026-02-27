import React, { useState, useEffect } from "react";
import AddPanel from '../../components/Panel/addPanel.js';
import Button from '../../components/PanelToggleButton/panelButton.js';
import CapsuleTimeService from '../../services/AdminPageService/CapsuleTimeService/capsuleTimeService.js';
import SoccerFieldService from '../../services/AdminPageService/SoccerFieldService/getSoccerFieldService.js';
import SoccerFieldTable from '../../components/SoccerFieldTable/soccerFieldTable.js';
import Callender from '../../components/Calendar/calendarWeekly.js';
import EditPanel from '../../components/Panel/editTimePanelForOneSoccer.js';
import Navbar from '../../components/Navbar/navbar.js';

function Admin() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [soccerFields, setSoccerFields] = useState([]);
    const [selectedSoccerField, setSelectedSoccerField] = useState(null);
    const [capsuleTimes, setCapsuleTimes] = useState([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isEditPanelOpen, setIsEditPanelOpen] = useState(false);

    const togglePanel = () => {
        setIsPanelOpen(prevState => !prevState);
    };

    const handleEdit = (soccerFieldId) => {
        const field =
            soccerFields.find(item => item.id === soccerFieldId) ||
            soccerFields.flatMap(item => item.subSoccerFields || []).find(sub => sub.id === soccerFieldId);

        if (field) {
            setSelectedSoccerField(field);
            setIsEditPanelOpen(true);
        }
    };

    const handleRowSelect = (soccerField) => {
        setSelectedSoccerField(prev => (prev && prev.id === soccerField.id ? null : soccerField));
    };

    const handleDelete = async (soccerFieldId) => {
        const result = await SoccerFieldService.deleteOneSoccerField(soccerFieldId);
        if (result) {
            setSoccerFields(prevFields => prevFields.filter(field => field.id !== soccerFieldId));
        } else {
            console.error("Silme işlemi başarısız oldu.");
        }
    };

    useEffect(() => {
        SoccerFieldService.getAllMainSoccerFields()
            .then(data => {
                console.log("Fetched Soccer Fields:", data);
                if (Array.isArray(data)) {
                    setSoccerFields(data);
                } else {
                    throw new Error("Beklenmeyen veri formatı.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error);
            })
            .finally(() => setIsLoaded(true));
    }, []);

    useEffect(() => {
        if (selectedSoccerField) {
            console.log("Selected Soccer Field ID:", selectedSoccerField.id);
            CapsuleTimeService.getAllCapsuleTimeForOneSoccerField(selectedSoccerField.id)
                .then(data => {
                    console.log("Fetched Capsule Times:", data);
                    setCapsuleTimes(data);
                })
                .catch(error => {
                    setError(error);
                });
        } else {
            setCapsuleTimes([]);
        }
    }, [selectedSoccerField]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Navbar />
            <Button isPanelOpen={isPanelOpen} togglePanel={togglePanel} />
            {isPanelOpen && <AddPanel togglePanel={togglePanel} />}
            <SoccerFieldTable 
                soccerFields={soccerFields} 
                onRowSelect={handleRowSelect} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
            />
            <Callender 
                selectedSoccerField={selectedSoccerField} 
                capsuleTimes={capsuleTimes} 
            />
            {isEditPanelOpen && (
                <EditPanel 
                    data={selectedSoccerField} 
                    onClose={() => setIsEditPanelOpen(false)} 
                />
                
            )}
        </div>
    );
}

export default Admin;
