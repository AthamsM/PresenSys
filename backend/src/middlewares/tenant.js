import { getPrisma } from "../config/database.js";

export const tenantVerification = (req, res, next) => {

    const schema = req.user.school;

    req.prisma = getPrisma(schema);

    next();

}