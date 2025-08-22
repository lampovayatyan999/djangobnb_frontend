'use server';

import { cookies } from 'next/headers';

const isProd = process.env.NODE_ENV === 'production';


export async function handleRefresh() {
    console.log('handleRefresh');

    const refreshToken = await getRefreshToken();
    const cookieStore = await cookies();

    const token = await fetch('https://startit1project0ebook.pythonanywhere.com/api/auth/token/refresh/', {
        method: 'POST',
        body: JSON.stringify({
            refresh: refreshToken
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then((json) => {
            console.log('Response - Refresh:', json);

            if (json.access) {
                cookieStore.set('session_access_token', json.access, {
                    httpOnly: true,
                    secure: isProd,
                    maxAge: 60 * 60, // 60 minutes
                    path: '/',
                });

                return json.access;
            } else {
                resetAuthCookies()
            }
        })
        .catch((error) => {
            console.log('error', error);

            resetAuthCookies();
        })

    return token;
}


export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    const cookieStore = await cookies();

    cookieStore.set('session_userid', userId, {
        httpOnly: true,
        secure: isProd,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });

    cookieStore.set('session_access_token', accessToken, {
        httpOnly: true,
        secure: isProd,
        maxAge: 60 * 60, // 60 minutes
        path: '/',
    });

    cookieStore.set('session_refresh_token', refreshToken, {
        httpOnly: true,
        secure: isProd,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    });
}

export async function resetAuthCookies() {
    const cookieStore = await cookies();

    const cookieOptions = {
        httpOnly: true,
        secure: isProd,
        maxAge: 0,
        path: '/',
    };

    cookieStore.set('session_userid', '', cookieOptions);
    cookieStore.set('session_access_token', '', cookieOptions);
    cookieStore.set('session_refresh_token', '', cookieOptions);
}

export async function getUserId() {
    const cookieStore = await cookies();
    return cookieStore.get('session_userid')?.value || null;
}

export async function getAccessToken() {
    const cookieStore = await cookies();

    let accessToken = cookieStore.get('session_access_token')?.value;


    if(!accessToken) {
        accessToken = await handleRefresh();
    }
    return cookieStore.get('session_access_token')?.value || null;
}

export async function getRefreshToken() {
    const cookieStore = await cookies();
    let refreshToken = cookieStore.get('session_refresh_token')?.value;

    return cookieStore.get('session_refresh_token')?.value || null;
}
