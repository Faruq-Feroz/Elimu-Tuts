import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowRight, 
  faHome,
  faInfoCircle,
  faLightbulb,
  faGraduationCap,
  faChalkboardTeacher,
  faDollarSign,
  faQuestionCircle,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Navbar.module.css";
import Logo from "../../assets/ElimuTutsLogo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId, e) => {
    e.preventDefault();
    
    if (!isHomePage) {
      navigate(`/#${sectionId}`);
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80;
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
    
    setExpanded(false);
  };

  // Mobile menu items with icons for better UX
  const mobileMenuItems = [
    { icon: faHome, label: "Home", link: "/", action: () => setExpanded(false) },
    { icon: faInfoCircle, label: "About", link: "/about", action: () => setExpanded(false) },
    { icon: faLightbulb, label: "Features", link: "#features", action: (e) => scrollToSection("features", e) },
    { icon: faGraduationCap, label: "Courses", link: "/dashboard/courses", action: () => setExpanded(false) },
    { icon: faChalkboardTeacher, label: "Tutors", link: "/register", action: () => setExpanded(false) },
    { icon: faDollarSign, label: "Pricing", link: "/pricing", action: () => setExpanded(false) },
    { icon: faQuestionCircle, label: "FAQ", link: "#faq", action: (e) => scrollToSection("faq", e) },
    { icon: faEnvelope, label: "Contact", link: "/contact", action: () => setExpanded(false) },
  ];

  return (
    <div className={styles.navWrapper}>
      <BootstrapNavbar 
        expand="lg" 
        className={`${styles.mainNav} ${isScrolled ? styles.scrolled : ""}`}
        expanded={expanded}
        onToggle={(expanded) => setExpanded(expanded)}
        fixed="top"
      >
        <Container fluid className={styles.fullWidthContainer}>
          <BootstrapNavbar.Brand as={Link} to="/" className={styles.brand}>
            <img src={Logo} alt="Elimu Tuts Logo" className={styles.logo} />
          </BootstrapNavbar.Brand>

          <div className={styles.mobileTopLogin}>
            <Link to="/login" className={styles.loginButtonSmall} onClick={() => setExpanded(false)}>
              Login <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className={styles.navbarToggler} />

          <BootstrapNavbar.Collapse id="basic-navbar-nav" className={styles.navbarCollapse}>
            <div className={styles.mobileOnlyMenu}>
              {mobileMenuItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.link} 
                  className={styles.mobileNavLink}
                  onClick={item.action}
                >
                  <span className={styles.mobileNavIcon}>
                    <FontAwesomeIcon icon={item.icon} />
                  </span>
                  {item.label}
                </Link>
              ))}
            </div>

            <Nav className={`ms-auto ${styles.navMenu}`}>
              <Nav.Link as={Link} to="/" className={styles.navLink} onClick={() => setExpanded(false)}>
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/about" className={styles.navLink} onClick={() => setExpanded(false)}>
                About Us
              </Nav.Link>

              <Nav.Link 
                href="#features" 
                className={styles.navLink}
                onClick={(e) => scrollToSection("features", e)}
              >
                Features
              </Nav.Link>

              <Nav.Link as={Link} to="/dashboard/courses" className={styles.navLink} onClick={() => setExpanded(false)}>
                Courses
              </Nav.Link>

              <Nav.Link as={Link} to="/register" className={styles.navLink} onClick={() => setExpanded(false)}>
                Tutors
              </Nav.Link>

              <Nav.Link as={Link} to="/pricing" className={styles.navLink} onClick={() => setExpanded(false)}>
                Pricing
              </Nav.Link>

              <Nav.Link 
                href="#faq" 
                className={styles.navLink}
                onClick={(e) => scrollToSection("faq", e)}
              >
                FAQ
              </Nav.Link>

              <Nav.Link as={Link} to="/contact" className={styles.navLink} onClick={() => setExpanded(false)}>
                Contact
              </Nav.Link>

              <Link to="/login" className={styles.loginButton} onClick={() => setExpanded(false)}>
                Login <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </div>
  );
};

export default Navbar;
