import React, { useState, useRef, useEffect } from 'react';
import styles from '../styles/Modal.module.css';
import { getInitials } from '../utils/storage';

const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

const CreateGroupModal = ({ onClose, onCreate }) => {
    const [name, setName] = useState('');
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const trimmedName = name.trim();
        if (trimmedName.length < 2) {
            // According to rule 4: "if the length of the name given to the group is less than 2"
            // Interpreting as "must be at least 2 characters" based on common logic, 
            // but let's stick to simple validation.
            return;
        }

        onCreate({
            id: Date.now().toString(),
            name: trimmedName,
            color: selectedColor,
            initials: getInitials(trimmedName)
        });
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal} ref={modalRef}>
                <h3>Create New group</h3>
                <form onSubmit={onFormSubmit}>
                    <div className={styles.inputRow}>
                        <label>Group Name</label>
                        <input
                            type="text"
                            placeholder="Enter group name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.inputRow}>
                        <label>Choose colour</label>
                        <div className={styles.colorPicker}>
                            {colors.map(color => (
                                <div
                                    key={color}
                                    className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                />
                            ))}
                        </div>
                    </div>
                    <button type="submit" className={styles.createBtn}>Create</button>
                </form>
            </div>
        </div>
    );
};

export default CreateGroupModal;
