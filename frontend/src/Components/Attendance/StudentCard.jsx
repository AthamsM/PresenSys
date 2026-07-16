
export function StudentCard({
    student,
    index,
    onToggle,
}) {
    return (
        <div
            className="flex items-center justify-between border-b px-4 py-4">
        
            <div className="flex items-center gap-4">

                <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold">
                        {index +1}
                </div>

                <div>

                    <h3 className="font-medium">
                        {student.name}
                    </h3>

                    <span
                        className={
                            student.present
                                ? "text-green-600"
                                : "text-red-500"
                        }
                    >
                        {student.present
                            ? "Presente"
                            : "Ausente"
                        }
                    </span>

                </div>

            </div>

            <button 
                onClick={() =>
                    onToggle(student.id)
                }
                className={`
                    relative h-8 w-14 rounded-full transition-all
                    ${
                        student.present
                            ? "bg-blue-500"
                            : "bg-gray-300"
                    }
                `}
            >
                <div
                    className={`
                        absolute top-1 h-6 w-6 rounded-full bg-white transition-all
                        ${
                            student.present
                                ? "translate-x-7"
                                : "translate-x-1"
                        }
                    `}
                />
            </button>
        </div>
    );
}