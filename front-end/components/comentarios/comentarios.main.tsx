import nProgress from 'nprogress';
import { Fragment, useEffect, useRef, useState } from 'react';
import CONSTS_COMENTARIOS from '../../utils/consts/data/constComentarios';
import COMENTARIOS from '../../utils/consts/outros/comentarios';
import { Auth } from '../../utils/context/usuarioContext';
import { Aviso } from '../../utils/outros/aviso';
import { Fetch } from '../../utils/outros/fetch';
import horarioBrasilia from '../../utils/outros/horarioBrasilia';
import iListaComentarios from '../../utils/types/listaComentarios';
import ModalAvisoLogin from '../modal/modal.aviso/login';
import ModalLayout from '../modal/_modal.layout';
import ModalWrapper from '../modal/_modal.wrapper';
import Textarea from '../outros/textarea';
import ComentariosLista from './comentarios.lista';
import Styles from './comentarios.module.scss';

interface iParametros {
    itemId: number;
    usuarioIdDonoItem: number;
}

export default function ComentariosMain({ itemId, usuarioIdDonoItem }: iParametros) {

    const token = Auth?.get()?.token ?? '';
    const usuarioId = Auth?.get()?.usuarioId ?? 0;

    const [isModalAvisoLoginOpen, setIsModalAvisoLoginOpen] = useState(false);
    const refTextarea = useRef<any>(null);
    const refBtn = useRef<any>(null);
    const [texto, setTexto] = useState('');

    const [comentarios, setComentarios] = useState<iListaComentarios[]>();
    async function getComentarios(itemId: number) {
        const url = `${CONSTS_COMENTARIOS.API_URL_GET_POR_ITEM_ID}/${itemId}`;
        const comentarios = await Fetch.getApi(url, null) as iListaComentarios[];
        setComentarios(comentarios);
    }

    useEffect(() => {
        if (itemId) {
            getComentarios(itemId);
        }
    }, [itemId])

    async function handleEnviar() {
        if (!token) {
            setIsModalAvisoLoginOpen(true);
            return false;
        }

        if (!texto) {
            refTextarea.current.select();
            return false;
        }

        if (usuarioId === usuarioIdDonoItem) {
            Aviso.warn('Você não pode comentar no seu próprio item', 5000);
            return false;
        }

        if (texto.length < 10) {
            Aviso.warn('O texto está muito curto, escreva mais algumas palavrinhas, por favor', 5000);
            refTextarea.current.select();
            return false;
        }

        nProgress.start();
        refBtn.current.disabled = true;

        const url = CONSTS_COMENTARIOS.API_URL_POST_CRIAR;
        const dto = {
            itemId: itemId,
            usuarioId: null,
            mensagem: texto,
            resposta: '',
            isAtivo: 1,
            dataMensagem: horarioBrasilia().format('YYYY-MM-DD HH:mm:ss'),
            dataResposta: null
        };

        const resposta = await Fetch.postApi(url, dto, token);
        if (!resposta || resposta?.erro) {
            nProgress.done();
            setTexto('');
            refTextarea.current.select();
            refBtn.current.disabled = false;
            Aviso.warn('Houve um problema em enviar seu comentário. Tente novamente mais tarde', 5000);
            return false;
        }

        nProgress.done();
        setTexto('');
        refBtn.current.disabled = false;
        Aviso.success('Comentário enviado com sucesso', 5000);
        getComentarios(itemId);
    }

    return (
        <Fragment>
            {/* Modal */}
            <ModalWrapper isOpen={isModalAvisoLoginOpen} >
                <ModalLayout handleModal={() => setIsModalAvisoLoginOpen(!isModalAvisoLoginOpen)} isExibirApenasLogo={true} titulo='Entre agora mesmo' tamanho='pequeno' isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalAvisoLogin handleModal={() => setIsModalAvisoLoginOpen(!isModalAvisoLoginOpen)} />
                </ModalLayout>
            </ModalWrapper>

            {/* Conteúdo */}
            <div className={Styles.main}>
                <Textarea
                    placeholder='Pergunte ao vendedor'
                    height={null}
                    max={COMENTARIOS.MAX_CARACTERES}
                    texto={texto}
                    setTexto={setTexto}
                    referenciaTextarea={refTextarea}

                    isMostrarBotao={true}
                    textoBotao='Perguntar'
                    handleFuncaoBotao={handleEnviar}
                    referenciaBotao={refBtn}
                    isEnabledBotao={true}
                />

                {
                    comentarios && (
                        <div className='margem1'>
                            <ComentariosLista
                                itemId={itemId}
                                usuarioIdDonoItem={usuarioIdDonoItem}
                                isExibirOpcaoResponder={true}
                                listaComentarios={comentarios}
                                maxCaracteres={COMENTARIOS.MAX_CARACTERES}
                                getComentarios={getComentarios}
                            />
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}