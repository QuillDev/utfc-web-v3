export let accessToken = "";

export interface accessTokenContent {
    exp: number,
    userId: number,
    email: string
}
export const setAccessToken = (token:string) => {
    accessToken = token;
    console.log(token);
}

export const getAccessToken = () => {
    return accessToken;
}