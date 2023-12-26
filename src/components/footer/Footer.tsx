import './Footer.sass'

interface IFooterProps {
    firstName: string,
    lastName: string
}

const Footer = ({firstName, lastName}: IFooterProps) => {
    return (
        <footer className='footer'>
            <h2 className='footer__title'>
                Developer: <span className='developer'>{`${firstName} ${lastName}`}</span>  
            </h2>
        </footer>
    )
}

export default Footer;