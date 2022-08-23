import Link from 'next/link';
import Router from 'next/router';
import nProgress from 'nprogress';
import { useContext, useRef, useState } from 'react';
import Botao from '../../../components/outros/botao';
import Facebook from '../../../components/svg/facebook';
import Google from '../../../components/svg/google';
import Logo from '../../../components/svg/logo';
import Styles from '../../../styles/usuario.autenticar.module.scss';
import CONSTS_SISTEMA from '../../../utils/consts/sistema';
import { Auth, UsuarioContext } from '../../../utils/context/usuarioContext';
import CONSTS_AUTENTICAR from '../../../utils/data/constAutenticar';
import { Aviso } from '../../../utils/outros/aviso';
import consultarGeneroPorNomePessoa from '../../../utils/outros/consultarGeneroPorNomePessoa';
import { Fetch } from '../../../utils/outros/fetch';
import gerarImagemPerfilRandom from '../../../utils/outros/gerarImagemPerfilRandom';
import pegarPrimeiraPalavraDaFrase from '../../../utils/outros/pegarPrimeiraPalavraDaFrase';

interface iFormData {
    usuario: string;
    senha: string;
}

export default function SessaoEntrar() {
    const usuarioContext = useContext(UsuarioContext);// Contexto do usuário;
    const [isAuth, setIsAuth] = [usuarioContext?.isAuthContext[0], usuarioContext?.isAuthContext[1]];
    const usuarioGenero = Auth?.get()?.genero ?? 'o';

    const refUsuario = useRef<any>(null);
    const refSenha = useRef<any>(null);
    const refBtn = useRef<any>(null);

    const [isExibirDivEmail, setIsExibirDivEmail] = useState(false);

    // Ao alterar os valores dos inputs, insira os valores nas variaveis do formData;
    const [formData, setFormData] = useState<iFormData>({ usuario: '', senha: '' });
    function handleChange(e: any) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Ao clicar no botão para entrar;
    async function handleSubmit(e: any) {
        nProgress.start();
        refBtn.current.disabled = true;

        if (!formData || !formData.usuario || !formData.senha) {
            instrucaoErro('O nome de usuário e/ou e-mail estão vazios!');
            return false;
        }

        const url = CONSTS_AUTENTICAR.API_URL_POST_LOGIN;
        const dto = {
            email: formData.usuario,
            nomeUsuarioSistema: formData.usuario,
            senha: formData.senha
        };

        const resposta = await Fetch.postApi(url, dto, null);

        if (resposta?.erro) {
            instrucaoErro('Algo deu errado<br/><br/>Provavelmente o usuário e/ou a senha estão errados!');
            return false;
        }

        // Inserir o token no json final para gravar localmente a sessão do login;
        resposta.genero = consultarGeneroPorNomePessoa(pegarPrimeiraPalavraDaFrase(resposta?.nomeCompleto));
        resposta.fotoPerfilAlternativa = gerarImagemPerfilRandom();
        Auth.set(resposta);

        // Atribuir autenticação ao contexto de usuário;
        setIsAuth(true);

        // Voltar à tela principal;
        Router.push('/');
        nProgress.done();
    }

    function handleKeyPress(e: any) {
        if (e.key === 'Enter') {
            refBtn.current.click();
        }
    }

    function instrucaoErro(msg: string) {
        nProgress.done();
        refSenha.current.value = '';
        formData.senha = '';
        refUsuario.current.select();
        refBtn.current.disabled = false;
        Aviso.warn(msg, 5000);
    }

    return (
        <section className={Styles.divPrincipal}>
            <Logo width='0.9rem' cor='var(--branco)' />
            <span className={Styles.titulo}>Bem-vind{usuarioGenero} ao {CONSTS_SISTEMA.NOME_SISTEMA}</span>

            {/* Inputs */}
            <div className={Styles.divLogin}>
                {
                    isExibirDivEmail ? (
                        <div className='animate__animated animate__fadeIn'>
                            <input className='input' type='text' placeholder='E-mail ou nome de usuário'
                                name='usuario' onChange={handleChange} ref={refUsuario} onKeyPress={handleKeyPress}
                            />

                            <input className='input margem0_5' type='password' placeholder='Senha'
                                name='senha' onChange={handleChange} ref={refSenha} onKeyPress={handleKeyPress}
                            />

                            <div className={`${Styles.botaoCustom} margem0_5`}>
                                <Botao texto='Entrar' url={null} isNovaAba={false} handleFuncao={handleSubmit} Svg={null} refBtn={refBtn} isEnabled={true} />
                            </div>
                        </div>
                    ) : (
                        <div className={Styles.botaoCustom}>
                            <Botao texto='Entrar com e-mail' url={null} isNovaAba={false} handleFuncao={() => setIsExibirDivEmail(true)} Svg={null} refBtn={null} isEnabled={true} />
                        </div>
                    )
                }
            </div>

            {/* Ou #1 */}
            <div>
                <div className={Styles.divisao}>ou</div>
                <div className={`${Styles.botaoCustom2} margem1`}>
                    <Botao texto='Continuar com o Facebook' url='/' isNovaAba={false} handleFuncao={null} Svg={<Facebook width='25px' />} refBtn={null} isEnabled={true} />
                </div>

                <div className={`${Styles.botaoCustom2} margem0_5`}>
                    <Botao texto='Continuar com o Google' url='/' isNovaAba={false} handleFuncao={null} Svg={<Google width='18px' />} refBtn={null} isEnabled={true} />
                </div>
            </div>

            {/* Ou #2 */}
            <div>
                <div className={Styles.divisao}>ou</div>
                <div className='margem1'>
                    <span className={Styles.subtitulo}>
                        Não tem uma conta ainda? <Link href='/usuario/criar-conta'><a className={'cor-principal'}>Crie a sua aqui</a></Link>
                    </span>
                </div>
            </div>
        </section>
    )
}