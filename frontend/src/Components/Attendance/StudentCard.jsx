export function StudentCard({
    student,
    index,
    onToggle,
    onJustify,
}) {
    return (
        <div className="flex items-center justify-between border-b px-4 py-4">

            <div className="flex items-center gap-4">

                <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-semibold"
                >
                    {index + 1}
                </div>

                <div>

                    <h3 className="font-medium">
                        {student.name}
                    </h3>

                    <div className="flex items-center gap-2">

                        <span
                            className={
                                student.present
                                    ? "text-green-600"
                                    : "text-red-500"
                            }
                        >
                            {student.present
                                ? "Presente"
                                : "Ausente"}
                        </span>

                        {!student.present && student.justification && (
                            <span className="inline-flex items-center rounded bg-green-100 border border-green-300 px-2.5 py-1 text-xs font-bold text-green-700">
                                Falta justificada
                            </span>
                        )}

                    </div>

                </div>

            </div>

            <div className="flex items-center gap-2">

                {!student.present && (
                    <button
                        onClick={() => onJustify(student)}
                        className={`px-3 py-1 rounded text-white text-sm ${
                            student.justification
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                    >
                        {student.justification
                            ? "Editar justificativa"
                            : "Justificar"}
                    </button>
                )}

                <button
                    onClick={() => onToggle(student.id)}
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

        </div>
    );
}