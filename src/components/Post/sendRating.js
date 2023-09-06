import axios from 'axios';
import { api } from '../../services/api';

const sendRating = () => {
    const rating = 3
    const userId = 1
    const itemId = 2
  // Substitua 'url_da_sua_api' pela URL real da sua API de avaliação de posts
  api.post('/ratings', { rating, userId, itemId })
    .then((response) => {
      // Lógica de manipulação de resposta bem-sucedida, se necessário
    })
    .catch((error) => {
      console.error('Erro ao enviar avaliação:', error);
    });
};
