import moment from 'moment';
import nProgress from 'nprogress';
import { ChangeEvent, Dispatch, Fragment, useRef, useState } from 'react';
import ModalAlterarSenha from '../../../../../components/modal/modal.alterarSenha';
import ModalLayout from '../../../../../components/modal/_modal.layout';
import ModalWrapper from '../../../../../components/modal/_modal.wrapper';
import Botao from '../../../../../components/outros/botao';
import Input from '../../../../../components/outros/input';
import TopHatSecundario from '../../../../../components/outros/topHat.secundario';
import { Fetch } from '../../../../../utils/api/fetch';
import CONSTS_USUARIOS from '../../../../../utils/consts/data/constUsuarios';
import CONSTS_MODAL from '../../../../../utils/consts/outros/modal.tamanho';
import CONSTS_SISTEMA from '../../../../../utils/consts/outros/sistema';
import { Aviso } from '../../../../../utils/outros/aviso';
import validarCompletoEmail from '../../../../../utils/outros/validacoes/validar.completo.email';
import validarCompletoNomeCompleto from '../../../../../utils/outros/validacoes/validar.completo.nomeCompleto';
import validarCompletoNomeUsuarioSistema from '../../../../../utils/outros/validacoes/validar.completo.nomeUsuarioSistema';
import validarCPF from '../../../../../utils/outros/validacoes/validar.cpf';
import validarDataNascimento from '../../../../../utils/outros/validacoes/validar.dataNascimento';
import validarNumeroTelefone from '../../../../../utils/outros/validacoes/validar.numeroTelefone';
import validarDadosCriarConta from '../../../../../utils/outros/validarDadosCriarConta';
import iUsuario from '../../../../../utils/types/usuario';
import Styles from './index.module.scss';

interface iParametros {
    usuario: iUsuario | undefined;

    isHouveAlteracao: boolean;
    setIsHouveAlteracao: Dispatch<boolean>;
}

interface iFormDadosPessoais {
    nomeCompleto: string;
    nomeUsuarioSistema: string;
    email: string;
    senha: string;
    dataAniversario: string | Date | null;
    cpf: string | null;
    telefone: string | null;
}

export default function SessaoDadosPessoais({ usuario, isHouveAlteracao, setIsHouveAlteracao }: iParametros) {

    const refBtn = useRef<any>(null);
    const [isModalAlterarSenha, setIsModalAlterarSenha] = useState<boolean>(false);
    const minCaracteresNomeCompleto = 3;

    const [formDataDadosPessoais, setFormDataDadosPessoais] = useState<iFormDadosPessoais>({
        nomeCompleto: usuario?.nomeCompleto ?? '',
        email: usuario?.email ?? '',
        nomeUsuarioSistema: usuario?.nomeUsuarioSistema ?? '',
        senha: `AEA_${CONSTS_SISTEMA.NOME_SISTEMA}`,
        dataAniversario: usuario?.usuariosInformacoes?.dataAniversario ?? '',
        cpf: usuario?.usuariosInformacoes?.cpf ?? '',
        telefone: usuario?.usuariosInformacoes?.telefone ?? '',
    });

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setFormDataDadosPessoais({ ...formDataDadosPessoais, [e?.target?.name]: e?.target?.value });
        !isHouveAlteracao && setIsHouveAlteracao(true);
    }

    async function handleSubmit() {
        let isContinuarUm = validarDadosCriarConta(formDataDadosPessoais, null, null, null, null, null, false);
        if (!isContinuarUm) {
            refBtn.current.disabled = false;
            return false;
        }

        nProgress.start();
        refBtn.current.disabled = true;

        const url = CONSTS_USUARIOS.API_URL_PUT_ATUALIZAR_DADOS_PESSOAIS;
        const dto = {
            nomeCompleto: formDataDadosPessoais.nomeCompleto,
            email: formDataDadosPessoais.email,
            nomeUsuarioSistema: formDataDadosPessoais.nomeUsuarioSistema,
            usuariosInformacoes: {
                dataAniversario: formDataDadosPessoais.dataAniversario ? formDataDadosPessoais.dataAniversario : '0001-01-01',
                cpf: formDataDadosPessoais.cpf,
                telefone: formDataDadosPessoais.telefone,
            }
        };

        const resposta = await Fetch.putApi(url, dto) as iUsuario;
        if (!resposta || resposta?.erro) {
            nProgress.done();
            refBtn.current.disabled = false;
            Aviso.warn(resposta?.mensagemErro ?? 'Houve um erro ao atualizar os dados', 5000);
            return false;
        }

        nProgress.done();
        refBtn.current.disabled = false;
        Aviso.success('Os seus <b>dados pessoais</b> foram atualizados com sucesso', 5000);
    }

    return (
        <Fragment>
            {/* Modal alterar senha */}
            <ModalWrapper isOpen={isModalAlterarSenha}>
                <ModalLayout handleModal={() => setIsModalAlterarSenha(!isModalAlterarSenha)} isExibirApenasLogo={true} titulo='Alterar senha' tamanho={CONSTS_MODAL.PEQUENO} isCentralizado={true} isFecharModalClicandoNoFundo={false}>
                    <ModalAlterarSenha handleModal={() => setIsModalAlterarSenha(!isModalAlterarSenha)} />
                </ModalLayout>
            </ModalWrapper>

            {/* Conteúdo */}
            <div className={`${Styles.main} margem1`}>
                <span className='separadorHorizontal'></span>
                <div className='margem0_5'>
                    <TopHatSecundario titulo='Dados pessoais' />

                    <div className={`${Styles.sessao} margem0_5`}>
                        <Input
                            titulo='Nome completo'
                            placeholder=''
                            name='nomeCompleto'
                            tipo='text'
                            isDisabled={false}
                            minCaracteres={minCaracteresNomeCompleto}
                            dataTip={`O seu nome completo deve ter pelo menos ${minCaracteresNomeCompleto} caracteres. E não se esqueça do seu sobrenome!`}
                            value={formDataDadosPessoais.nomeCompleto}
                            mascara=''
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={true}
                            handleValidacaoExtra={validarCompletoNomeCompleto(false, formDataDadosPessoais.nomeCompleto, null, null, null)}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <Input
                            titulo='E-mail'
                            placeholder=''
                            name='email'
                            tipo='text'
                            isDisabled={false}
                            minCaracteres={0}
                            dataTip='Coloque seu melhor e-mail aqui 🖖'
                            value={formDataDadosPessoais.email}
                            mascara=''
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={true}
                            handleValidacaoExtra={validarCompletoEmail(false, formDataDadosPessoais.email, null, null, null)}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <Input
                            titulo='Nome de usuário do sistema'
                            placeholder=''
                            name='nomeUsuarioSistema'
                            tipo='text'
                            isDisabled={false}
                            minCaracteres={0}
                            dataTip={`Esse aqui vai ser seu @ aqui no ${CONSTS_SISTEMA.NOME_SISTEMA}`}
                            value={formDataDadosPessoais.nomeUsuarioSistema}
                            mascara=''
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={true}
                            handleValidacaoExtra={validarCompletoNomeUsuarioSistema(false, formDataDadosPessoais.nomeUsuarioSistema, null, null, null)}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <div className={Styles.divInputSenha}>
                            <Input
                                titulo='Senha'
                                placeholder=''
                                name='senha'
                                tipo='password'
                                isDisabled={true}
                                minCaracteres={0}
                                dataTip=''
                                value={formDataDadosPessoais.senha}
                                mascara=''
                                referencia={null}
                                isExibirIconeDireita={false}
                                isExisteValidacaoExtra={false}
                                handleValidacaoExtra={null}
                                handleChange={() => null}
                                handleKeyPress={() => null}
                                handleBlur={() => null}
                            />

                            <div>
                                <Botao texto='Alterar senha' url={null} isNovaAba={false} handleFuncao={() => setIsModalAlterarSenha(true)} Svg={null} refBtn={refBtn} isEnabled={true} />
                            </div>
                        </div>

                        <span className='separadorHorizontal'></span>
                        <Input
                            titulo='Aniversário'
                            placeholder=''
                            name='dataAniversario'
                            tipo='date'
                            isDisabled={false}
                            minCaracteres={0}
                            dataTip='Qual é a fortunada data do seu nascimento?'
                            value={moment(formDataDadosPessoais?.dataAniversario).format('yyyy-MM-DD')}
                            mascara=''
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={true}
                            handleValidacaoExtra={validarDataNascimento(moment(formDataDadosPessoais?.dataAniversario).format('yyyy-MM-DD'))}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <Input
                            titulo='CPF'
                            placeholder='___.___.___-__'
                            name='cpf'
                            tipo='text'
                            isDisabled={false}
                            minCaracteres={0}
                            dataTip='Seu CPF aqui, por favor. Não use geradores, hein?'
                            value={formDataDadosPessoais.cpf}
                            mascara='999.999.999-99'
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={true}
                            handleValidacaoExtra={validarCPF(formDataDadosPessoais.cpf?.toString())}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <Input
                            titulo='Telefone'
                            placeholder='(__) _____-____'
                            name='telefone'
                            tipo='text'
                            isDisabled={false}
                            minCaracteres={0}
                            dataTip='Juramos que não vamos te enviar trava-zaps'
                            value={formDataDadosPessoais.telefone}
                            mascara='(99) 99999-9999'
                            referencia={null}
                            isExibirIconeDireita={true}
                            isExisteValidacaoExtra={true}
                            handleValidacaoExtra={validarNumeroTelefone(formDataDadosPessoais.telefone?.toString())}
                            handleChange={handleChange}
                            handleKeyPress={() => null}
                            handleBlur={() => null}
                        />

                        <span className='separadorHorizontal'></span>
                        <div className='divBotaoInvertido'>
                            <Botao texto='Salvar alterações dos seus dados pessoais' url={null} isNovaAba={false} handleFuncao={() => handleSubmit()} Svg={null} refBtn={refBtn} isEnabled={true} />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

