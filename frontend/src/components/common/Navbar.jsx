import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Navbar.module.css";
import Logo from "../../assets/Logo.png";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (dropdownId) => {
    setActiveDropdown((prev) => (prev === dropdownId ? null : dropdownId));
  };

  return (
    <div className={styles.navWrapper}>
      {/* Main Navigation */}
      <BootstrapNavbar expand="lg" className={styles.mainNav} fluid>
        <Container fluid className={styles.fullWidthContainer}>
          {/* Logo */}
          <BootstrapNavbar.Brand as={Link} to="/" className={styles.brand}>
            <img src={Logo} alt="Elimu Tuts Logo" className={styles.logo} />
          </BootstrapNavbar.Brand>

          {/* Navigation Toggle Button */}
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className={styles.navbarToggler} />

          {/* Navigation Menu */}
          <BootstrapNavbar.Collapse id="basic-navbar-nav" className={styles.navbarCollapse}>
            <Nav className={`ms-auto ${styles.navMenu}`}>
              <Nav.Link as={Link} to="/" className={styles.navLink}>
                HOME
              </Nav.Link>

              {/* Courses Dropdown */}
              <div className={`${styles.navItem} ${activeDropdown === "courses" ? styles.active : ""}`}>
                <div className={styles.navLink} onClick={() => handleDropdownToggle("courses")}>
                  COURSES
                </div>
                <div className={styles.dropdownContent}>
                  <Link to="/courses/mathematics" className={styles.dropdownItem}>
                    Mathematics
                  </Link>
                  <Link to="/courses/science" className={styles.dropdownItem}>
                    Science
                  </Link>
                  <Link to="/courses/english" className={styles.dropdownItem}>
                    English
                  </Link>
                  <Link to="/courses/computer-science" className={styles.dropdownItem}>
                    Computer Science
                  </Link>
                </div>
              </div>

              {/* Tutors */}
              <Nav.Link as={Link} to="/tutors" className={styles.navLink}>
                TUTORS
              </Nav.Link>

              {/* Dashboard Dropdown */}
              <div className={`${styles.navItem} ${activeDropdown === "dashboard" ? styles.active : ""}`}>
                <div className={styles.navLink} onClick={() => handleDropdownToggle("dashboard")}>
                  DASHBOARD
                </div>
                <div className={styles.dropdownContent}>
                  <Link to="/dashboard/student" className={styles.dropdownItem}>
                    Student Dashboard
                  </Link>
                  <Link to="/dashboard/tutor" className={styles.dropdownItem}>
                    Tutor Dashboard
                  </Link>
                  <Link to="/dashboard/parent" className={styles.dropdownItem}>
                    Parent Dashboard
                  </Link>
                </div>
              </div>

              <div className={`${styles.navItem} ${activeDropdown === "about" ? styles.active : ""}`}>
                <div className={styles.navLink} onClick={() => handleDropdownToggle("about")}>
                  ABOUT US
                </div>
                <div className={styles.dropdownContent}>
                  <Link to="/about/mission" className={styles.dropdownItem}>
                    Our Mission
                  </Link>
                  <Link to="/about/team" className={styles.dropdownItem}>
                    Our Team
                  </Link>
                  <Link to="/about/contact" className={styles.dropdownItem}>
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Login Button */}
              <Link to="/login" className={styles.loginButton}>
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