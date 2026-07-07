import { useEffect, useState } from "react";
import { AttendanceHeader } from "../../Components/Attendance/AttendanceHeader";
import { AttendanceStats } from "../../Components/Attendance/AttendanceStats";
import { AttendanceSearch } from "../../Components/Attendance/AttendanceSearch";
import { AttendanceActions } from "../../Components/Attendance/AttendanceActions";
import { StudentCard } from "../../Components/Attendance/StudentCard";
import { useSearchParams } from "react-router-dom";

export default function AttendancePage() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    //o ID da turma tá vindo pela url
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id"); //o valor que vai buscar no banco da turma

    useEffect(() =>{
        loadStudents();
    }, []);

    async function loadStudents() {
        try {
            // Substituir depois pela API
            const data = [
                {
                    id: 1,
                    name: "Bruno Almeida",
                    present: false,
                },
                {
                    id: 2, 
                    name: "Carla Mendes",
                    present: false,
                },
                {
                    id: 3,
                    name: "Daniel Ferreira",
                    present: false,
                },
                {
                    id: 4, 
                    name: "Eduarda Lima",
                    present: false,
                },
            ];

            setStudents(data);
        }   catch (error) {
            console.error(error);
        }
    }

    function toggleAttendance(id) {
        setStudents((currentStateStudents) => 
            currentStateStudents.map((student) =>
                student.id === id
                    ?   {
                            ...student,
                             present: !student.present,
                        }   
                    : student
            )
        );
    }

    function markAllPresent() {
        setStudents((currentStateStudents) =>
            currentStateStudents.map((student) => ({
                ...student,
                present: true,
            }))
        );
    }

    const filterStudents = students.filter((student) =>
        student.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    const totalStudents = students.length;

    const totalPresent = students.filter(
        (student) => student.present
    ).length;

    const calculateAttendance =
        totalStudents === 0
            ? 0
            : Math.round(
                (totalPresent / totalStudents) * 100
              );
    
    return (
        <div className="max-w-3xl mx-auto p-6">

            <AttendanceHeader />

            <AttendanceStats
                totalStudents={totalStudents}
                totalPresent={totalPresent}
                calculateAttendance={calculateAttendance}
            />

            <AttendanceSearch
                value={search}
                onChange={setSearch}
            />

            <AttendanceActions
                onMarkAll={markAllPresent}
            />

            <div className="mt-6 rounded-xl border bg-white">

                {filterStudents.map(
                    (student, index) => (
                        <StudentCard
                            key={student.id}
                            student={student}
                            index={index}
                            onToggle={toggleAttendance}
                        />
                    )
                )}

            </div>

        </div>
    );                        
} 
    



    
