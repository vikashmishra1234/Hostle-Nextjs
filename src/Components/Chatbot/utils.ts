import Student from "@/models/Student"

export const getPhoneNumber=async(name:string)=>{
    console.log(name)
   try {
    if(!name){
        return false
    }
     const phone = await Student.find({studentName:name});
     console.log(phone)
   } catch (error) {
    console.log(error)
   }
}