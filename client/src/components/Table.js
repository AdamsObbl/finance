import React from "react"
import styles from './Table.module.css';
import { CardUser } from "./CardUser";

export function Table({ users }) {
    return <div className={styles.grid}>
        {users?.map((user) =>
            <CardUser user={user} key={user.id} />
        )}
    </div>
}