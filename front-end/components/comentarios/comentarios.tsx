import Styles from './comentarios.module.scss';

export default function Comentarios() {
    return (
        <div className={Styles.main}>
            <textarea className='textarea' placeholder='Pergunte ao vendedor'>
            </textarea>

            <h1>teste</h1>
        </div>
    )
}