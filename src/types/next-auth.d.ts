import 'next-auth';
import 'next/server';
import { DefaultSession } from 'next-auth';

declare module 'next-auth'{
    interface User{
        _id?:string;
        adminId?:string;
        role?:string;
        studentName?:string;
        rollNumber?:string;
        studentYear?:string;
    }
    interface Session{
        user:{
            _id?:string;
            adminId?:string;
            role?:string;
            studentName?:string;
            rollNumber?:string;
            studentYear?:string;
        } & DefaultSession['user']
    } 
}

declare module 'next-auth/jwt'{
    interface JWT{
        _id?:string;
        adminId?:string;
        role?:string;
        studentName?:string;
        rollNumber?:string;
        studentYear?:string;
    }
}

declare module 'next/server'{
    interface NextRequest{
        adminId?:string | unknown;
    }
}