import { User } from "../src/types/user";

interface UserParams {
    userId: string;
}

interface Credentials {
    t: string;
}

type UserListResponse = User[] | { error: string };

const signin = async (user : User) => {
    try {
        const response = await fetch('/auth/signin/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(user)
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

const signout = async () => {
    try {
        const response = await fetch('/auth/signout/', { method: 'GET' });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

const create = async (user : User): Promise<User> => {
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        return await response.json();

    } catch (e) {
        console.log(e);
        throw e;
    }
}

const list = async (signal: AbortSignal): Promise<UserListResponse> => {
    try {
      const response = await fetch('/api/users/', {
        method: 'GET',
        signal: signal,
      });
      return await response.json();
    } catch (e : unknown) {
      console.log(e);
      const errorMessage = e instanceof Error ? e.message : 'Unknown error';
      return { error: errorMessage };
    }
}

const read = async (params : UserParams, credentials : Credentials, signal : AbortSignal) => {
    try {
        const response = await fetch('/api/users/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const update = async (params : UserParams, credentials : Credentials) => {
    try {
        const response = await fetch('api/users/' + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t

            }
        });

        return await response.json();

    } catch (e) {
        console.log(e);
    }
}

const remove = async (params : UserParams, credentials : Credentials) => {
    try {
        const response = await fetch('/api/users/' + params.userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        });
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

export { create, list, read, update, remove, signin, signout };