import { PrismaClient } from "@prisma/client";

const clients = new Map();

export function getPrisma(schema) {

    if (!clients.has(schema)) {

        const url =
            `postgresql://postgres:1801@localhost:5432/frequencia_escolar?schema=${schema}`;

        clients.set(schema, new PrismaClient({
            datasources: {
                db: { url }
            }
        }));
    }

    return clients.get(schema);
}