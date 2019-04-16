import { UserSession } from './../store/userSession/types';

export default interface User {
    userSession: UserSession,
    name: string,
    picture: string, // URL
}