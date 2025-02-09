import { fetchStudents } from "@/app/utils";
import { List, Users, CreditCard, UserPlus } from "lucide-react";
import { Student } from "@/types/types";
import Link from "next/link";

const TomCom = async () => {
  const studentData: Student[] | null = await fetchStudents();
  const cards = [
    {
      title: "Total students",
      value: studentData?.length || 0,
      icon: Users,
      path: "/admin/dashboard/addstudent",
      color: "bg-blue-500",
    },
    {
      title: "Not paid yet",
      value:
        studentData?.filter((item: Student) => item.feeStatus == false)
          .length || 0,
      icon: CreditCard,
      path: "/admin/dashboard/addstudent",
      color: "bg-red-500",
    },
    {
      title: "Add New Student",
      value: "",
      icon: UserPlus,
      path: "/",
      color: "bg-green-500",
    },
    {
      title: "Today's Attendance",
      value: "",
      icon: List,
      path: "/admin/dashboard/addstudent",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <Link
                href={card.path}
                className="p-6 flex flex-col items-center justify-center"
              >
                <h2 className="text-2xl font-bold mb-2">
                  {card.value ? (
                    <div
                      className={`p-4 rounded-full ${card.color} text-white mb-4`}
                    >
                      {card.value}
                    </div>
                  ) : (
                    0 || (
                      <div
                        className={`p-4 rounded-full ${card.color} text-white mb-4`}
                      >
                        <card.icon size={24} />
                      </div>
                    )
                  )}
                </h2>
                <p className="text-gray-600 text-center">{card.title}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TomCom;
