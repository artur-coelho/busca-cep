export default async function searchCep(cep) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.erro) {
            throw new Error('CEP not found');
        }
        return data;
    } catch (error) {
        console.error('Error fetching CEP data:', error);
        throw error;
    }
}