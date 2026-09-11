
export function AttendanceStats ({ totalStudents, totalPresent, calculateAttendance }) {

    const stats = [

        {
            "title":"Alunos",
            "value":totalStudents,
            "icon":"icons/class-blue.svg",
            "color": "#263238",
        },
        {
            "title":"Presentes",
            "value":totalPresent,
            "icon":"icons/circle-check-blue.svg",
            "color": "#00A63E",
        },
        {
            "title":"Frequência",
            "value": `${calculateAttendance}%`,
            "icon":"icons/square-poll-blue.svg",
            "color": "#155DDD",
        },

    ];

    return (

        <div className="grid grid-cols-3 gap-x-4 text-[0.8rem] sm:text-[0.9rem] text-center animate-scale-in-center [--animation-duration:0.33s]">

            {stats.map((stat) => (

                <div className="p-3 flex justify-center items-center gap-x-[2rem] bg-[#FFFFFC] rounded-lg border border-gray-200 shadow-md shadow-gray-300"> 

                    <img src={stat.icon} alt="" className="hidden sm:block w-[2.3rem]"/>

                    <div>
                        <p className="text-gray-500">
                            {stat.title}
                        </p>

                        <h2 className={`text-[${stat.color}] font-bold`}>
                            {stat.value}
                        </h2>
                    </div>

                </div>

            ))}

        </div>

    );
}