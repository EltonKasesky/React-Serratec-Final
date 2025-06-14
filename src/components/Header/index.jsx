import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { TbLogin } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { CgDarkMode } from "react-icons/cg";

const Header = () => {
  const { isAuthenticated, logout, userInfo } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAdmin = userInfo?.roles?.includes("ROLE_ADMIN");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.navHeader}>
      <Link to="/" onClick={closeMenu}>
        <img src="/images/logo/logo.jpg" alt="Logo" className={styles.logo} />
      </Link>

      <nav className={styles.menu}>
        <ul
          className={`${styles.navLinks} ${
            isMenuOpen ? styles.navLinksOpen : ""
          }`}
        >
          {isAuthenticated && isAdmin && (
            <li>
              <Link
                to={"/admin"}
                className={styles.navItem}
                onClick={closeMenu}
              >
                Admin
              </Link>
            </li>
          )}
          <li>
            <Link to={"/"} className={styles.navItem} onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to={"/clientes"}
              className={styles.navItem}
              onClick={closeMenu}
            >
              Clientes
            </Link>
          </li>
          <li>
            <Link
              to={"/produtos"}
              className={styles.navItem}
              onClick={closeMenu}
            >
              Produtos
            </Link>
          </li>
          <li>
            {isAuthenticated ? (
              <button onClick={handleLogout} className={styles.navButton}>
                Logout <TbLogin />
              </button>
            ) : (
              <Link
                to={"/login"}
                className={styles.navItem}
                onClick={closeMenu}
              >
                Login <BiLogIn />
              </Link>
            )}
          </li>

          <li>
            <button className={styles.navButton} onClick={() => {}}>
              <CgDarkMode size={20} style={{ marginRight: "8px" }} />
            </button>
          </li>
        </ul>
      </nav>

      <button
        className={styles.hamburgerButton}
        onClick={toggleMenu}
        aria-controls="primary-navigation"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        <span className={styles.visuallyHidden}>Menu</span>
      </button>
    </header>
  );
};

export default Header;
