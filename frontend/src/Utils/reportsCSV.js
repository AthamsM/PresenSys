export function reportsCSV(dataJson, nameFile = 'alunos.csv') {
    if (!dataJson || dataJson.length === 0) {
        console.error("O JSON enviado está vazio.");
        return;
    }

    const headers = Object.keys(dataJson[0]);
    headers.shift();

    const rowCsv = [];

    rowCsv.push(headers.join(';'));

    for (const item of dataJson) {
        const values = headers.map(field => {
            // Garante que se o texto tiver aspas ou ponto e vírgula, ele não quebre o CSV
            let value = item[field] === undefined || item[field] === null ? '' : item[field];
            if (typeof value === 'string') {
                value = value.replace(/"/g, '""'); // Escapa aspas duplas
                if (value.includes(';') || value.includes('\n')) {
                    value = `"${value}"`; // Coloca entre aspas se houver caractere especial
                }
            }
            return value;
        });
        rowCsv.join
        rowCsv.push(values.join(';'));
    }
    rowCsv[0] = 'nome;matricula;serie;classe;faltas;faltas_justificadas'   
    
    // O prefixo \ufeff serve para forçar o Excel a ler com codificação UTF-8 corretamente (acentos como 1º Ano)
    const bodyCsv = '\ufeff' + rowCsv.join('\n');

    const blob = new Blob([bodyCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    link.setAttribute("href", url);
    link.setAttribute("download", nameFile);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
