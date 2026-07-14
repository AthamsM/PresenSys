export function formatDate(time) {
    return time.substring(0, 10).split("-").reverse().join("/");
}