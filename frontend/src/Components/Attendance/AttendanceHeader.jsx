
export function AttendanceHeader() {
    return (
        <div>
            <button className="flex items-center gap-2 text-gray-500">
                <img
                    src="/back-arrow.svg"
                    alt="Voltar"
                    className="w-4 h-4"
                />
                Voltar
            </button>

            <h1 className="mt-4 text-4xl font-bold">
                1º Ano A
            </h1>

            <p className="text-gray-500">
                Sábado, 04 de Julho de 2026
            </p>
        </div>
    );
}