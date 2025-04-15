import { useState, useEffect } from "react";
import { list } from '../../api/user_api.ts';
import { User } from "../types/user.ts";

export default function Users() {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        list(signal).then((data) => {
            if ('error' in data) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });

        return () => abortController.abort();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <Users users={users} />
        </div>
    );
}