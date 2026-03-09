/* 
 * Author: shaik adil
 * Project: Pocket Notes Clone
 */
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import NotesView from './components/NotesView';
import CreateGroupModal from './components/CreateGroupModal';
import { getGroups, saveGroup } from './utils/storage';
import './styles/globals.css';

function App() {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        setGroups(getGroups());
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const processGroupAddition = (newGroup) => {
        if (groups.some(g => g.name.toLowerCase() === newGroup.name.toLowerCase())) {
            alert("Group already exists!");
            return;
        }
        saveGroup(newGroup);
        setGroups([...groups, newGroup]);
        setIsModalOpen(false);
    };

    const onGroupSwitch = (group) => {
        setSelectedGroup(group);
    };

    const handleBack = () => {
        setSelectedGroup(null);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            {(!isMobile || !selectedGroup) && (
                <Sidebar
                    groups={groups}
                    selectedGroupId={selectedGroup?.id}
                    onSelectGroup={onGroupSwitch}
                    onAddGroup={() => setIsModalOpen(true)}
                />
            )}

            {(!isMobile || selectedGroup) && (
                <NotesView
                    group={selectedGroup}
                    isMobile={isMobile}
                    onBack={handleBack}
                />
            )}

            {isModalOpen && (
                <CreateGroupModal
                    onClose={() => setIsModalOpen(false)}
                    onCreate={processGroupAddition}
                />
            )}
        </div>
    );
}

export default App;
