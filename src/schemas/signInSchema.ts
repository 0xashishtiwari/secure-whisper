import {z} from 'zod';
import { usernameValidation } from './signUpSchema';
export const signInSchema = z.object(
    {
        identifier : z.union([z.string().email({message :'Invalid email address or username'}), usernameValidation]),
        password : z.string().min(6 , {message :'Password must be at least 6 characters long'})
    }
)