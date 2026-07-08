export function formatDate(time) {
    return new Date(time).toLocaleString("pt-BR", {
        timeZone: "America/Sao_Paulo",
        hour12: false
    });
}