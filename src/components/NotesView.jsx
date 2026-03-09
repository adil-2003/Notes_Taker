import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Notes.module.css';
import { getNotes, saveNote, formatDate, formatTime } from '../utils/storage';
import { Lock, SendHorizontal } from 'lucide-react';

const NotesView = ({ group, isMobile, onBack }) => {
    const [notes, setNotes] = useState([]);
    const [messageText, setMessageText] = useState('');
    const notesEndRef = useRef(null);

    const scrollToBottom = () => {
        notesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (group) {
            setNotes(getNotes(group.id));
        }
    }, [group]);

    useEffect(() => {
        scrollToBottom();
    }, [notes]);

    if (!group) {
        if (isMobile) return null;
        return (
            <div className={styles.container}>
                <div className={styles.welcome}>
                    <img src="/pic1.png" alt="Pocket Notes Welcome" className={styles.welcomeImg} />
                    <h1>Pocket Notes</h1>
                    <p>Sync your thoughts across all devices securely. Join thousands using Pocket Notes daily.</p>
                </div>
                <div className={styles.encryptionFooter}>
                    <Lock size={14} /> end-to-end encrypted
                </div>
            </div>
        );
    }

    const onSubmission = () => {
        if (!messageText.trim()) return;
        const newNote = {
            id: Date.now().toString(),
            content: messageText.trim(),
            createdAt: new Date().toISOString()
        };
        saveNote(group.id, newNote);
        setNotes([...notes, newNote]);
        setMessageText('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmission();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {isMobile && (
                    <button className={styles.backBtn} onClick={onBack}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 12H4M4 12L10 18M4 12L10 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                )}
                <div className={styles.headerAvatar} style={{ backgroundColor: group.color }}>
                    {group.initials}
                </div>
                <div className={styles.headerName}>{group.name}</div>
            </div>

            <div className={styles.notesList}>
                {notes.map(note => (
                    <div key={note.id} className={styles.noteCard}>
                        <div className={styles.noteContent}>{note.content}</div>
                        <div className={styles.noteMeta}>
                            {formatDate(note.createdAt)} <span>&nbsp;•&nbsp;</span> {formatTime(note.createdAt)}
                        </div>
                    </div>
                ))}
                <div ref={notesEndRef} />
            </div>

            <div className={styles.inputArea}>
                <div className={styles.textareaWrapper}>
                    <textarea
                        className={styles.textarea}
                        placeholder="Write something amazing..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className={styles.sendBtn}
                        disabled={!messageText.trim()}
                        onClick={onSubmission}
                    >
                        <SendHorizontal
                            size={24}
                            color={messageText.trim() ? "#001F8B" : "#ABABAB"}
                            fill={messageText.trim() ? "#001F8B" : "none"}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotesView;

