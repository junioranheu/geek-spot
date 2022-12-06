import { Dispatch, ReactNode, useState } from 'react';
import Logo from '../svg/logo';
import { FecharModal } from './fecharModal';
import BotaoFecharModal from './_botaoFecharModal';
import Styles from './_modal.module.scss';

interface iParametros {
    handleModal: Dispatch<boolean>;
    isExibirApenasLogo: boolean;
    titulo: string | null;
    children: ReactNode;
    tamanho: string; // 'gigante', 'grande', 'medio' ou '';
    isCentralizado: boolean;
    isFecharModalClicandoNoFundo: boolean;
}

export default function ModalLayout({ handleModal, isExibirApenasLogo, titulo, children, tamanho, isCentralizado, isFecharModalClicandoNoFundo }: iParametros) {
    const [animarDiv, setAnimarDiv] = useState<string>('');

    return (
        <div className={`${Styles.fundo} semHighlight`} onMouseDown={(e) => FecharModal.fecharModalClicandoNoFundo(isFecharModalClicandoNoFundo, handleModal, e, setAnimarDiv)}>
            <div className={animarDiv}>
                <div className={`${Styles.modal} ${(tamanho === 'gigante' ? Styles.modalGigante : tamanho === 'grande' ? Styles.modalGrande : tamanho === 'pequeno' ? Styles.modalPequeno : '')} animate__animated animate__fadeIn animate__faster`}>
                    <div className={Styles.divCabecalho}>
                        <BotaoFecharModal fecharModal={() => FecharModal.fecharModalClicandoNoBotao(handleModal)} />

                        {
                            <div className={Styles.cabecalhoTitulo}>
                                {
                                    isExibirApenasLogo ? (
                                        <Logo width='2rem' />
                                    ) : (
                                        titulo && (
                                            <div dangerouslySetInnerHTML={{ __html: titulo }} />
                                        )
                                    )
                                }
                            </div>
                        }
                    </div>

                    {/* children = conteúdo do "body" do modal passada como children */}
                    <div className={Styles.divPrincipal}>
                        <div className={`${Styles.conteudo} ${(isCentralizado && Styles.centralizarConteudo)}`}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}