export const getGroups = () => {
    const groups = localStorage.getItem('pocket_notes_groups');
    return groups ? JSON.parse(groups) : [];
};

export const saveGroup = (group) => {
    const groups = getGroups();
    const updatedGroups = [...groups, group];
    localStorage.setItem('pocket_notes_groups', JSON.stringify(updatedGroups));
};

export const getNotes = (groupId) => {
    const allNotes = localStorage.getItem('pocket_notes_data');
    const data = allNotes ? JSON.parse(allNotes) : {};
    return data[groupId] || [];
};

export const saveNote = (groupId, note) => {
    const allNotes = localStorage.getItem('pocket_notes_data');
    const data = allNotes ? JSON.parse(allNotes) : {};
    if (!data[groupId]) data[groupId] = [];
    data[groupId].push(note);
    localStorage.setItem('pocket_notes_data', JSON.stringify(data));
};

export const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(/\s+/);
    if (words.length === 0) return "";
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
};

export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(new Date(date));
};

export const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).format(new Date(date));
};
