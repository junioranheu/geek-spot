import Image from 'next/image';
import { Dispatch, Fragment, useEffect, useState } from 'react';
import ImgCinza from '../../static/image/outros/cinza.webp';
import converterSrcImagemParaBase64 from '../../utils/outros/converterSrcImagemParaBase64';
import ModalUpload from '../modal/modal.upload/modal.upload';
import ModalLayout from '../modal/_modal.layout';
import ModalWrapper from '../modal/_modal.wrapper';
import Botao from '../outros/botao';
import Styles from './divUpload.module.scss';

interface iParametros {
    imagem: string | null;
    apiPasta: string | null;
    titulo: string;
    infoAleatoriaUm: string;
    infoAleatoriaDois: string | null;
    textoBotaoDireita: string | null;

    arquivoUpload: string | null;
    setArquivoUpload: Dispatch<string>;
}

export default function DivUpload({ imagem, apiPasta, titulo, infoAleatoriaUm, infoAleatoriaDois, textoBotaoDireita, arquivoUpload, setArquivoUpload }: iParametros) {

    const [isModalUploadFotoPerfilOpen, setIsModalUploadFotoPerfilOpen] = useState(false);

    useEffect(() => {
        if (imagem) {
            const img = `${apiPasta}/${imagem}`;

            converterSrcImagemParaBase64(img)
                .then((base64: any) => {
                    // console.log(base64);
                    setArquivoUpload(base64);
                });
        }
    }, [imagem]);

    function handleRemoverFoto() {
        setArquivoUpload('');
    }

    return (
        <Fragment>
            {/* Modal */}
            <ModalWrapper isOpen={isModalUploadFotoPerfilOpen}>
                <ModalLayout handleModal={() => setIsModalUploadFotoPerfilOpen(!isModalUploadFotoPerfilOpen)} isExibirApenasLogo={true} titulo={null} tamanho='' isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalUpload isBase64={true} handleModal={() => setIsModalUploadFotoPerfilOpen(!isModalUploadFotoPerfilOpen)} setArquivoUpload={setArquivoUpload} />
                </ModalLayout>
            </ModalWrapper>

            <div className={Styles.main}>
                <Image src={(arquivoUpload ? arquivoUpload : ImgCinza)} width={100} height={100} alt='' />

                <div className={Styles.infos}>
                    <span className={Styles.titulo}>{titulo}</span>
                    <span className={Styles.texto}>{infoAleatoriaUm}</span>
                    <span className={Styles.texto}>{infoAleatoriaDois && infoAleatoriaDois}</span>
                    {
                        (imagem || arquivoUpload) && (
                            <span className={`${Styles.texto} ${Styles.vermelho} pointer`} onClick={() => handleRemoverFoto()}>Remover</span>
                        )
                    }
                </div>

                {
                    textoBotaoDireita && (
                        <div className={Styles.divBotao}>
                            <span className='separador'></span>

                            <Botao
                                texto={textoBotaoDireita}
                                url={null}
                                isNovaAba={false}
                                handleFuncao={() => setIsModalUploadFotoPerfilOpen(true)}
                                Svg={null}
                                refBtn={null}
                                isEnabled={true}
                            />
                        </div>
                    )
                }
            </div>
        </Fragment>
    )
}
