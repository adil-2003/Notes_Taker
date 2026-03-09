import React from 'react';
import styles from '../styles/Sidebar.module.css';

const Sidebar = ({ groups, selectedGroupId, onSelectGroup, onAddGroup }) => {
    return (
        <div className={styles.sidebar}>
            <h1 className={styles.title}>Pocket Notes</h1>
            <div className={styles.groupList}>
                {groups.map(group => (
                    <div
                        key={group.id}
                        className={`${styles.groupItem} ${selectedGroupId === group.id ? styles.active : ''}`}
                        onClick={() => onSelectGroup(group)}
                    >
                        <div className={styles.avatar} style={{ backgroundColor: group.color }}>
                            {group.initials}
                        </div>
                        <span className={styles.groupName}>{group.name}</span>
                    </div>
                ))}
            </div>
            <button className={styles.addButton} onClick={onAddGroup}>+</button>
        </div>
    );
};

export default Sidebar;
