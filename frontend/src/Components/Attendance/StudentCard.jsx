export function StudentCard({
    student,
    index,
    onToggle,
    onJustify,
}) {
    return (
        <div className="flex items-center justify-between px-2 py-2 text-[0.8rem] ">

            <div className="flex items-center gap-4">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-200  font-semibold">
                    {index + 1}
                </div>

                <div>

                    <h3 className="font-medium">
                        {student.name}
                    </h3>

                    <div className="flex items-center gap-2">

                        <span className={`rounded-md px-[0.4rem] py-[0.12rem] text-xs font-bold ${student.present ? " bg-green-200 text-green-800" : "bg-red-200 text-xs font-bold text-red-800"}`}>
                            {student.present ? "Presente" : "Ausente"}
                        </span>

                        {!student.present && student.justification && (
                            <span className="inline-flex items-center rounded-md px-[0.4rem] py-[0.12rem] bg-green-200 text-xs font-bold text-green-800">
                                Justificada
                            </span>
                        )}

                    </div>

                </div>

            </div>

            <div className="flex items-center gap-2">

                {!student.present && (
                    <button
                        onClick={() => onJustify(student)}
                        className={`px-[0.8rem] py-[0.5rem] rounded-lg text-[#263238]/70 text-[0.85rem] font-bold cursor-pointer leading-none ${
                            student.justification
                                ? "bg-blue-500 hover:bg-blue-600 text-[#FFFFFC]"
                                : "bg-gray-300 hover:bg-gray-200"
                        }`}
                    >
                        {student.justification
                            ? "Editar"
                            : "Justificar"}
                    </button>
                )}

                <button
                    onClick={() => onToggle(student.id)}
                    className={`relative h-[1.85rem] w-9 rounded-lg transition-all cursor-pointer
                        ${
                            student.present
                                ? "bg-blue-500"
                                : "bg-gray-300"
                        }
                    `}
                >
                    <div
                        className={`
                            absolute top-1 h-[1.3rem] w-2 rounded-lg bg-white transition-all
                            ${
                                student.present
                                    ? "translate-x-[1.4rem]"
                                    : "translate-x-[0.4rem]"
                            }
                        `}
                    />
                </button>

            </div>

        </div>
    );
}