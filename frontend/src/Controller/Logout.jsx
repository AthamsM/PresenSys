

export default function Logout() {
    // Limpar o localStorage
    localStorage.clear();
  
    // Redirecionar para a página de login
    window.location.href = '/';
  
    return null; // Não renderiza nada
  }