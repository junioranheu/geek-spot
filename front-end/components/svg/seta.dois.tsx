import Router from 'next/router';
import iSvg from '../../utils/types/svg';

export default function SetaDois({ width, url, title, isCorPrincipal }: iSvg) {
    return (
        <svg width={width ?? 24} height={width ?? 24} className={`pointer cor-principal-hover ${(isCorPrincipal && 'cor-principal')}`} onClick={() => url && Router.push(url)}>
            <path d='m183.853752 35.1461309-6.999921-6.9998833c-.194998-.1949968-.511994-.1949968-.706992 0-.194998.1949967-.194998.5119914 0 .7069882l6.14593 6.1468975h-19.792775c-.275997 0-.499994.2229963-.499994.4999917 0 .2759954.223997.4999917.499994.4999917h19.792775l-6.14593 6.1458975c-.194998.1949968-.194998.5119915 0 .7069882.097999.0979984.225998.1469976.352996.1469976.127999 0 .255997-.0489992.353996-.1469976l6.999921-6.9998833c.194997-.1949967.194997-.5119915 0-.7069882' fill='currentColor' fillRule='evenodd' transform='matrix(-1 0 0 1 184 -28)'></path>
            {title && <title>{title}</title>}
        </svg>
    )
} 