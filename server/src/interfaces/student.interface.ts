import { User } from "./user.interface";
export interface Student extends User{
    course: string;
    age: number
}