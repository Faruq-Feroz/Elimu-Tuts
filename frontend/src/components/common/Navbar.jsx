import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowRight, 
  faPlus, 
  faMinus,
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
  const [activeDropdown, setActiveDropdown] = useState(null);
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

  const handleDropdownToggle = (dropdownId) => {
    setActiveDropdown((prev) => (prev === dropdownId ? null : dropdownId));
  };

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
    { icon: faInfoCircle, label: "About", dropdown: "about" },
    { icon: faLightbulb, label: "Features", link: "#features", action: (e) => scrollToSection("features", e) },
    { icon: faGraduationCap, label: "Courses", dropdown: "courses" },
    { icon: faChalkboardTeacher, label: "Tutors", link: "/tutors", action: () => setExpanded(false) },
    { icon: faDollarSign, label: "Pricing", link: "#pricing", action: (e) => scrollToSection("pricing", e) },
    { icon: faQuestionCircle, label: "FAQ", link: "#faq", action: (e) => scrollToSection("faq", e) },
    { icon: faEnvelope, label: "Contact", link: "#contact", action: (e) => scrollToSection("contact", e) },
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
                item.dropdown ? (
                  <div 
                    key={index} 
                    className={`${styles.mobileNavItem} ${activeDropdown === item.dropdown ? styles.active : ""}`}
                  >
                    <div 
                      className={styles.mobileNavLink}
                      onClick={() => handleDropdownToggle(item.dropdown)}
                    >
                      <span className={styles.mobileNavIcon}>
                        <FontAwesomeIcon icon={item.icon} />
                      </span>
                      {item.label}
                      <span className={styles.mobileDropdownIcon}>
                        {activeDropdown === item.dropdown ? (
                          <FontAwesomeIcon icon={faMinus} />
                        ) : (
                          <FontAwesomeIcon icon={faPlus} />
                        )}
                      </span>
                    </div>
                    {item.dropdown === "about" && (
                      <div className={styles.mobileSubmenu}>
                        <Link to="/about/mission" className={styles.mobileSubmenuItem} onClick={() => setExpanded(false)}>
                          Our Mission
                        </Link>
                        <Link to="/about/team" className={styles.mobileSubmenuItem} onClick={() => setExpanded(false)}>
                          Our Team
                        </Link>
                        <Link to="/about/contact" className={styles.mobileSubmenuItem} onClick={() => setExpanded(false)}>
                          Contact Us
                        </Link>
                      </div>
                    )}
                    {item.dropdown === "courses" && (
                      <div className={styles.mobileSubmenu}>
                        <Link to="/courses/mathematics" className={styles.mobileSubmenuItem} onClick={() => setExpanded(false)}>
                          Mathematics
                        </Link>
                        <Link to="/courses/science" className={styles.mobileSubmenuItem} onClick={() => setExpanded(false)}>
                          Science
                        </Link>
                        <Link to="/courses/english" className={styles.mobileSubmenuItem} onClick={() => setExpanded(false)}>
                          English
                        </Link>
                        <Link to="/courses/computer-science" className={styles.mobileSubmenuItem} onClick={() => setExpanded(false)}>
                          Computer Science
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
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
                )
              ))}
            </div>

            {/* Desktop menu - unchanged */}
            <Nav className={`ms-auto ${styles.navMenu}`}>
              <Nav.Link as={Link} to="/" className={styles.navLink} onClick={() => setExpanded(false)}>
                Home
              </Nav.Link>

              {/* About Us */}
              <div className={`${styles.navItem} ${activeDropdown === "about" ? styles.active : ""}`}>
                <div 
                  className={`${styles.navLink} ${styles.hasDropdown}`} 
                  onClick={() => handleDropdownToggle("about")}
                >
                  About Us
                  <span className={styles.mobileDropdownIcon}>
                    {activeDropdown === "about" ? (
                      <FontAwesomeIcon icon={faMinus} />
                    ) : (
                      <FontAwesomeIcon icon={faPlus} />
                    )}
                  </span>
                </div>
                <div className={styles.dropdownContent}>
                  <Link to="/about/mission" className={styles.dropdownItem} onClick={() => setExpanded(false)}>
                    Our Mission
                  </Link>
                  <Link to="/about/team" className={styles.dropdownItem} onClick={() => setExpanded(false)}>
                    Our Team
                  </Link>
                  <Link to="/about/contact" className={styles.dropdownItem} onClick={() => setExpanded(false)}>
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Features */}
              <Nav.Link 
                href="#features" 
                className={styles.navLink}
                onClick={(e) => scrollToSection("features", e)}
              >
                Features
              </Nav.Link>

              {/* Courses Dropdown */}
              <div className={`${styles.navItem} ${activeDropdown === "courses" ? styles.active : ""}`}>
                <div 
                  className={`${styles.navLink} ${styles.hasDropdown}`} 
                  onClick={() => handleDropdownToggle("courses")}
                >
                  Courses
                  <span className={styles.mobileDropdownIcon}>
                    {activeDropdown === "courses" ? (
                      <FontAwesomeIcon icon={faMinus} />
                    ) : (
                      <FontAwesomeIcon icon={faPlus} />
                    )}
                  </span>
                </div>
                <div className={styles.dropdownContent}>
                  <Link to="/courses/mathematics" className={styles.dropdownItem} onClick={() => setExpanded(false)}>
                    Mathematics
                  </Link>
                  <Link to="/courses/science" className={styles.dropdownItem} onClick={() => setExpanded(false)}>
                    Science
                  </Link>
                  <Link to="/courses/english" className={styles.dropdownItem} onClick={() => setExpanded(false)}>
                    English
                  </Link>
                  <Link to="/courses/computer-science" className={styles.dropdownItem} onClick={() => setExpanded(false)}>
                    Computer Science
                  </Link>
                </div>
              </div>

              {/* Remaining desktop menu items */}
              <Nav.Link as={Link} to="/tutors" className={styles.navLink} onClick={() => setExpanded(false)}>
                Tutors
              </Nav.Link>

              <Nav.Link href="#pricing" className={styles.navLink} onClick={(e) => scrollToSection("pricing", e)}>
                Pricing
              </Nav.Link>

              <Nav.Link href="#faq" className={styles.navLink} onClick={(e) => scrollToSection("faq", e)}>
                FAQ
              </Nav.Link>

              <Nav.Link href="#contact" className={styles.navLink} onClick={(e) => scrollToSection("contact", e)}>
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
