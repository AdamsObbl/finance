import React, { useEffect, useRef, useState } from "react";

export function CardEditName({ user, styles, setChangeData }) {
    const inpNameRef = useRef(null);
    const [name, setName] = useState(user.name);
    const [isNameEditing, setIsNameEditing] = useState(false);
    useEffect(() => {
        const handleDocClick = (e) => {
            e.detail === 2 || setIsNameEditing(false);
        }
        if (isNameEditing) {
            inpNameRef.current.focus();
            document.addEventListener('click', handleDocClick);
        }
        return () => document.removeEventListener('click', handleDocClick);
    }, [isNameEditing]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setIsNameEditing(false);
        }
    };

    return (<span onClick={(e) => {
        setIsNameEditing(e.detail === 2);
    }}>
        {isNameEditing ? <input
            className={styles.editNameElm}
            ref={inpNameRef}
            value={name}
            onChange={e => {
                setName(e.target.value)
                setChangeData({ id: user.id, name: e.target.value });
            }}
            onKeyDown={handleKeyDown}
            onClick={e => {
                e.stopPropagation();
            }}
        />
            : name}
    </span>)
}