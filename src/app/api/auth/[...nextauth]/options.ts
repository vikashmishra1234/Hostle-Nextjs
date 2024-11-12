import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import  connectToDatabase  from "@/lib/dbConnect";
import bcrypt from 'bcryptjs'
import Admin from "@/models/Admin";
import Student from "@/models/Student";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id:'credentials',
            name:'Credentials',
            credentials:{
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize (credentials: any):Promise<any>{
                try {
                    connectToDatabase();
                    if(credentials.role=='admin'){
                        
                        const {adminId,password,role} = credentials;
                        if(!adminId || !password || !role){
                            throw new Error("Provid all credentials")
                        }
                        const admin = await Admin.findOne({adminId});
                        if(!admin){
                            throw new Error("wrong admin id");
                        }
                        const isMatch = await bcrypt.compareSync(password, admin.password);
                        if(!isMatch){
                            throw new Error("Invalid Password")
                        }
                        return { id: admin._id, adminId: admin.adminId,role:role };
                        
                    }
                    else if(credentials.role=='student'){
                       
                        
                            const {rollNumber,password,role} = credentials;
                            if(!rollNumber || !password || !role){
                                throw new Error("Provid all credentials")
                            }
                            const student = await Student.findOne({rollNumber});
                            if(!student){
                                throw new Error("wrong admin id");
                            }
                            const isMatch = await bcrypt.compareSync(password, student.studentPassword);
                            if(!isMatch){
                                throw new Error("Invalid Password")
                            }
                            return { id: student._id, rollNumber: student.rollNumber,role:role,studentName:student.studentName,studentYear:student.studentYear };
                    }
                } catch (error:any) {
                    throw new Error(error)
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if(user && user?.adminId){
               token.adminId = user.adminId;
               token.role = user.role
            }
            else if(user){
                token.studentName = user.studentName
                token.rollNumber = user.rollNumber
                token.studentYear = user.studentYear
                token.role = user.role
            }
          return token
        },
        async session({ session, token }) {
            if(token && token.adminId){
                session.user.adminId = token.adminId;
                session.user.role = token.role
             }
             else if(token){
                 session.user.studentName = token.studentName
                 session.user.rollNumber = token.rollNumber
                 session.user.studentYear = token.studentYear
                 session.user.role = token.role
             }
            return session;
          },
    }
    ,
    // pages:{
    //     signIn:'/admin'
    // },
    session:{
        strategy:'jwt',
        maxAge: 900,
    },
    secret:"vikash mishra"
}