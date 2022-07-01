import horarioBrasilia from '../../utils/outros/horarioBrasilia';

export const Fetch = {
    async getApi(url, token) {
        // console.log(url);
        let respostaJson = '';
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        try {
            let resposta = await fetch(url, {
                method: 'GET',
                headers: headers
            });

            // console.log(resposta);

            respostaJson = await resposta.json();
            // console.log(respostaJson);
            // console.log(respostaJson.status);

            // Caso o respostaJson.status seja diferente de nulo, é porque algo deu erro...
            // Exemplo: erros 404, 400 ou 401, quando um usuário escreve na barra e procura por um ID que não existe;
            if (respostaJson.status) {
                console.log(`Erro ${respostaJson.status} em ${url}. Tipo de erro: ${respostaJson.title}`);
                respostaJson = null;
            }
        } catch (erro) {
            const e = {
                'url': url,
                'token': token,
                'erro': erro.message,
                'data': horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            // Aviso.error('Houve uma falha na requisição GET ao servidor!', 5000);
        }

        return respostaJson;
    },

    async postApi(url, body, token) {
        let respostaJson = '';
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }

        try {
            let resposta = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            // console.log(resposta);

            respostaJson = await resposta.json();
            // console.log(respostaJson);
            // console.log(respostaJson.status);

            // Caso o respostaJson.status seja diferente de nulo, é porque algo deu erro...
            // Exemplo: erros 404, 400 ou 401, quando um usuário escreve na barra e procura por um ID que não existe;
            if (respostaJson.status) {
                console.log(`Erro ${respostaJson.status} em ${url}. Tipo de erro: ${respostaJson.title}`);
                respostaJson = null;
            }
        } catch (erro) {
            const e = {
                'url': url,
                'body': body,
                'token': token,
                'erro': erro.message,
                'data': horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            // Aviso.error('Houve uma falha na requisição POST ao servidor!', 5000);
        }

        return respostaJson;
    },

    async postUparImagemApi(url, formData, token) {
        let resposta = '';
        let headers = {
            'Authorization': `Bearer ${token}`
        }

        try {
            resposta = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: formData
            });

            // console.log(resposta);
        } catch (erro) {
            const e = {
                'url': url,
                'formData': formData,
                'token': token,
                'erro': erro.message,
                'data': horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            // Aviso.error('Houve uma falha na requisição POST (Upar imagem) ao servidor!', 5000);
        }

        return resposta;
    },

    async getApiStream(url, token) {
        // console.log(url);
        let respostaStream = '';
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/octet-stream',
            'Authorization': `Bearer ${token}`
        }

        try {
            let respostaStream = await fetch(url, {
                method: 'GET',
                headers: headers
            });

            // console.log('respostaStream: ', respostaStream);
            // console.log('respostaStream.status: ' + respostaStream.status);

            // Caso o respostaStream.status seja diferente de nulo, é porque algo deu erro...
            // Exemplo: erros 404, 400 ou 401, quando um usuário escreve na barra e procura por um ID que não existe;
            if (respostaStream.status !== 200) {
                console.log(`Erro ${respostaStream.status} em ${url}.`);
                respostaStream = null;
            } else {
                return respostaStream;
            }
        } catch (erro) {
            const e = {
                'url': url,
                'token': token,
                'erro': erro.message,
                'data': horarioBrasilia().format('YYYY-MM-DD HH:mm:ss')
            }

            console.table(e);
            // Aviso.error('Houve uma falha na requisição GET ao servidor!', 5000);
        }
    },
}