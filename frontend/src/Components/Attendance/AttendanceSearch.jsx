
export function AttendanceSearch({
    value,
    onChange,
}) {
    return (
        <div className="relative mt-6">
            <img
                src="icons/loupe.svg"
                alt="Buscar"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
            />

            <input
                type="text"
                value={value}
                onChange={(e) =>
                    onChange(e.target.value)
                }
                placeholder="Buscar aluno..."
                className="w-full rounded-xl border py-3 pl-12 pr-4"
            />
        </div>
    );
}