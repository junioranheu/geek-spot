export const FecharModal = {
    fecharModalClicandoNoBotao(handleModal: any) {
        handleModal();
    },

    fecharModalClicandoNoFundo(isFecharModalClicandoNoFundo: boolean, handleModal: any, e: any, setAnimarDiv: any) {
        // console.log(e.target);
        if (e.target.className.toString().includes('fundo')) {
            // Se for permitido fechar clicando no fundo, feche;
            if (isFecharModalClicandoNoFundo) {
                handleModal();
                return false;
            }

            // Se não for permitido fechar clicando no fundo, faça a animação apenas;
            setAnimarDiv('animate__animated animate__shakeX');
            setTimeout(function () {
                setAnimarDiv('');
            }, 700);
        }
    },

    animacaoOpen() {
        return 'animate__animated animate__fadeInUp animate__faster';
    }
}