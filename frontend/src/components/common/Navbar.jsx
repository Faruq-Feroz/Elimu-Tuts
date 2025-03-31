import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
    
    // Only apply scroll behavior on home page
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    
    // Close mobile menu
    setExpanded(false);
  };

  // Mobile menu items with icons for better UX
  const mobileMenuItems = [
    { icon: faHome, label: "Home", link: "/", action: () => setExpanded(false) },
    { icon: faInfoCircle, label: "About", link: "#about", action: (e) => scrollToSection("about", e) },
    { icon: faLightbulb, label: "Features", link: "#features", action: (e) => scrollToSection("features", e) },
    { icon: faGraduationCap, label: "Courses", link: "#courses", action: (e) => scrollToSection("courses", e) },
    { icon: faChalkboardTeacher, label: "Tutors", link: "/register", action: () => setExpanded(false) },
    { icon: faDollarSign, label: "Pricing", link: "/register", action: () => setExpanded(false) },
    { icon: faQuestionCircle, label: "FAQ", link: "#faq", action: (e) => scrollToSection("faq", e) },
    { icon: faEnvelope, label: "Contact", link: "#footer", action: (e) => scrollToSection("footer", e) },
  ];

  return (
    <div className={styles.navWrapper}>
      {/* Main Navigation */}
      <BootstrapNavbar 
        expand="lg" 
        className={`${styles.mainNav} ${isScrolled ? styles.scrolled : ""}`}
        expanded={expanded}
        onToggle={(expanded) => setExpanded(expanded)}
        fluid
      >
        <Container fluid className={styles.fullWidthContainer}>
          {/* Logo */}
          <BootstrapNavbar.Brand as={Link} to="/" className={styles.brand}>
            <img src={Logo} alt="Elimu Tuts Logo" className={styles.logo} />
          </BootstrapNavbar.Brand>

          {/* Login Button for Mobile - Outside Collapse */}
          <div className={styles.mobileTopLogin}>
            <Link to="/login" className={styles.loginButtonSmall} onClick={() => setExpanded(false)}>
              Login <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>

          {/* Navigation Toggle Button */}
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className={styles.navbarToggler} />

          {/* Navigation Menu */}
          <BootstrapNavbar.Collapse id="basic-navbar-nav" className={styles.navbarCollapse}>
            {/* For mobile devices */}
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

            {/* Desktop menu */}
            <Nav className={`ms-auto ${styles.navMenu}`}>
              <Nav.Link as={Link} to="/" className={styles.navLink} onClick={() => setExpanded(false)}>
                Home
              </Nav.Link>

              {/* About Us - Scrolls to about section */}
              <Nav.Link 
                href="#about" 
                className={styles.navLink}
                onClick={(e) => scrollToSection("about", e)}
              >
                About Us
              </Nav.Link>

              {/* Features */}
              <Nav.Link 
                href="#features" 
                className={styles.navLink}
                onClick={(e) => scrollToSection("features", e)}
              >
                Features
              </Nav.Link>

              {/* Courses - Scrolls to courses section */}
              <Nav.Link 
                href="#courses" 
                className={styles.navLink}
                onClick={(e) => scrollToSection("courses", e)}
              >
                Courses
              </Nav.Link>

              {/* Tutors - Links to register page */}
              <Nav.Link as={Link} to="/register" className={styles.navLink} onClick={() => setExpanded(false)}>
                Tutors
              </Nav.Link>

              {/* Pricing - Links to register page */}
              <Nav.Link as={Link} to="/register" className={styles.navLink} onClick={() => setExpanded(false)}>
                Pricing
              </Nav.Link>

              {/* FAQ */}
              <Nav.Link 
                href="#faq" 
                className={styles.navLink}
                onClick={(e) => scrollToSection("faq", e)}
              >
                FAQ
              </Nav.Link>

              {/* Contact - Scrolls to footer */}
              <Nav.Link 
                href="#footer" 
                className={styles.navLink}
                onClick={(e) => scrollToSection("footer", e)}
              >
                Contact
              </Nav.Link>

              {/* Login button */}
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
