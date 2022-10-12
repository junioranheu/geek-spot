import { API_BASE_URL_DEV, API_BASE_URL_PROD } from '../../api/urlApi';

const ENDPOINTS = {
    GET_TODOS: 'api/AjudasTopicos/todos',
    GET_BY_ID: 'api/AjudasTopicos',
    POST_ADICIONAR: 'api/AjudasTopicos/adicionar',
    PUT_ATUALIZAR: 'api/AjudasTopicos/atualizar',
    DELETE_DELETAR: 'api/AjudasTopicos/deletar'
};

const DEV = {
    API_URL_GET_TODOS: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_BY_ID: `${API_BASE_URL_DEV}/${ENDPOINTS.GET_BY_ID}`,
    API_URL_POST_ADICIONAR: `${API_BASE_URL_DEV}/${ENDPOINTS.POST_ADICIONAR}`,
    API_URL_PUT_ATUALIZAR: `${API_BASE_URL_DEV}/${ENDPOINTS.PUT_ATUALIZAR}`,
    API_URL_DELETE_DELETAR: `${API_BASE_URL_DEV}/${ENDPOINTS.DELETE_DELETAR}`
};

const PROD = {
    API_URL_GET_TODOS: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_TODOS}`,
    API_URL_GET_BY_ID: `${API_BASE_URL_PROD}/${ENDPOINTS.GET_BY_ID}`,
    API_URL_POST_ADICIONAR: `${API_BASE_URL_PROD}/${ENDPOINTS.POST_ADICIONAR}`,
    API_URL_PUT_ATUALIZAR: `${API_BASE_URL_PROD}/${ENDPOINTS.PUT_ATUALIZAR}`,
    API_URL_DELETE_DELETAR: `${API_BASE_URL_PROD}/${ENDPOINTS.DELETE_DELETAR}`
};

// Definir se as constantes para a API é DEV ou PROD;
const CONSTS = process.env.NODE_ENV === 'development' ? DEV : PROD;

export default CONSTS;