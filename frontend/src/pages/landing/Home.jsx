const scrollToSection = (sectionId, e) => {
  e.preventDefault();
  
  if (!isHomePage) {
    navigate(`/#${sectionId}`);
    return;
  }
  
  const section = document.getElementById(sectionId);
  if (section) {
    const yOffset = -80; // Adjust this value based on your navbar height
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }
  
  setExpanded(false);
};
