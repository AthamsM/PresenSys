
export function AttendanceActions({
    onMarkAll,
}) {
    return (
        <div>
            <button
            onClick={onMarkAll}
            className="mt-4 w-full rounded-xl bg-gray-100 py-4 font-medium hover:bg-gray-200">
                Marcar todos como presentes
            </button>

        </div>
    );  
}