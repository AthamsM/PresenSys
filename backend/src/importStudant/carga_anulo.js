import XLSX from "xlsx";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.join(__dirname, "carga1.xlsx");

async function getOrCreateClass(classText) {
    // Exemplo:
    // 2ANO - I - TDS2IN-B

    const grade = classText.split("-")[0].trim(); // 2ANO

    // Última letra após o último "-"
    const lastPart = classText.split("-").pop().trim(); // TDS2IN-B
    const name = lastPart.split("-").pop().trim(); // B

    let turma = await prisma.class.findFirst({
        where: {
            grade,
            name,
        },
    });

    if (!turma) {
        turma = await prisma.class.create({
            data: {
                name,
                grade,
                schoolYear: new Date().getFullYear(),
            },
        });

        console.log(`Turma criada: ${grade} ${name}`);
    }

    return turma;
}

async function importStudents() {
    const workbook = XLSX.readFile(FILE_PATH);

    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
    });

    let currentClass = null;

    for (const row of rows) {

        // Primeira coluna
        const firstCell = String(row[0] || "").trim();

        if (!firstCell) continue;

        // Detecta linha da turma
        // Ex.: 2ANO - I - TDS2IN-B
        if (/^\d+ANO\s*-/.test(firstCell)) {
            currentClass = await getOrCreateClass(firstCell);
            continue;
        }

        // Ignora cabeçalhos
        if (
            firstCell === "Matrícula" ||
            firstCell === "Alunos das Turmas" ||
            firstCell.startsWith("ESCOLA") ||
            firstCell.startsWith("Ensino Médio")
        ) {
            continue;
        }

        // Matrícula precisa ser número
        if (!currentClass || isNaN(Number(firstCell))) {
            continue;
        }

        const enrollment = String(firstCell).replace(".0", "").trim();
        const name = String(row[1]).trim();

        if (!name) continue;

        const exists = await prisma.student.findUnique({
            where: {
                enrollment,
            },
        });

        if (exists) {
            console.log(`Aluno já existe: ${name}`);
            continue;
        }

        await prisma.student.create({
            data: {
                name,
                enrollment,
                classId: currentClass.id,
            },
        });

        console.log(`Aluno inserido: ${name}`);
    }

    console.log("Importação concluída.");
}

importStudents()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
    });