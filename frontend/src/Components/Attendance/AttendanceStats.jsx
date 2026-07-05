
export function AttendanceStats ({
    totalStudents,
    totalPresent,
    calculateAttendance,
}) {
    return (
        <div className="grid grid-cols-3 gap-4 mt-6">

            <div className="rounded-xl border p-4">
                <p className="text-gray-500">
                    Alunos
                </p>

                <h2 className="text-3xl font-bold">
                    {totalStudents}
                </h2>
            </div>

            <div className="rounded-xl border p-4">
                <p className="text-gray-500">
                    Presentes
                </p>

                <h2 className="text-3xl font-bold text-green-600">
                    {totalPresent}
                </h2>
            </div>
        
            <div className="rounded-xl border p-4">
                <p className="text-gray-500">
                    Frequência
                </p>
            

                <h2 className="text-3xl font-bold text-blue-600">
                {calculateAttendance}%
                </h2>
            </div>

        </div>
    );
}