/**
 * Função genérica para lógica de seleção única.
 * Quando um novo item é clicado, ele substitui o anterior (não bloqueia).
 * 
 * @param {string|null} itemAtual - O valor do item atualmente selecionado (ou null)
 * @param {string} novoItem - O valor do item que foi clicado
 * @returns {string|null} - O novo valor a ser definido no estado (se o novoItem for igual ao atual, retorna null para desmarcar; caso contrário, retorna o novoItem)
 */
export function handleSelectUnico(itemAtual, novoItem) {
  // Se clicou no mesmo item que já está selecionado, desmarca (toggle)
  if (itemAtual === novoItem) {
    return null;
  }
  // Caso contrário, seleciona o novo item (substitui)
  return novoItem;
}

/* Notação pessoal: Ignorar

Exemplo de como usar
const [selecionado, setSelecionado] = useState(null);

function aoClicar(item) {
  setSelecionado(handleSelectUnico(selecionado, item));
}
*/