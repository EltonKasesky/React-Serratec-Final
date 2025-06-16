import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>&copy; {new Date().getFullYear()} FarmaDev. Todos os direitos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
