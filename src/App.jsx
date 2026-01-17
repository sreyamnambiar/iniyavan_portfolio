import { useEffect, useState } from 'react'
import './App.css'

// Import JSON data
import navigationData from './data/navigation.json'
import heroData from './data/hero.json'
import educationData from './data/education.json'
import experienceData from './data/experience.json'
import projectsData from './data/projects.json'
import contactData from './data/contact.json'

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://hw1s4rp4ef.execute-api.us-east-1.amazonaws.com/default/portfolio2-email-backend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message,
          }),
        }
      );

      if (response.ok) {
        alert("Message sent!");
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    // If a user hasn't opted in for reduced motion, then we add the animation
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }
  }, []);

  return (
    <>
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      
      <header>
        <nav>
          <ul>
            {navigationData.menuItems.map(item => (
              <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
            ))}
          </ul>
        </nav>
      </header>
      
      <main>
        <section className="full-page-section" id="home">
          <div className="container col-xxl-8 px-4">
            <div className="row flex-lg-row-reverse align-items-center g-5">
              <div className="col-10 col-sm-8 col-lg-6">
                <img className="performance-image d-block mx-auto" src={heroData.profileImage} loading="lazy" alt={heroData.profileImageAlt} />
              </div>
              <div className="col-lg-6">
                <h1 className="display-5 fw-bold lh-1 mb-4">{heroData.title}</h1>
                <p className="lead">{heroData.description}</p>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                  <a href={heroData.ctaLink} className="btn btn-primary btn-lg px-4 me-md-2">{heroData.ctaButton}</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="full-page-section" id="education" style={{padding: '100px 40px'}}>
          <div className="container">
            <h2 className="section-title" style={{marginBottom: '50px'}}>{educationData.title}</h2>
            
            {/* Education Cards */}
            <div className="row justify-content-center g-4" style={{marginBottom: '30px'}}>
              {educationData.institutions.map(institution => (
                <div key={institution.id} className="col-lg-5 col-md-6 school">
                  <img className="bd-placeholder-img" width="70" height="70" role="img" aria-label={institution.logoAlt} src={institution.logo} alt={institution.name} />
                  <div className="school-content">
                    <h2 className="fw-normal">{institution.name}</h2>
                    <p style={{fontSize: '0.85rem', marginBottom: '5px', color: 'white'}}>{institution.level}</p>
                    <p>{institution.location}</p>
                    {institution.certificate && (
                      <a href={institution.certificate.url} target="_blank" rel="noopener noreferrer" className="certificate-badge">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        {institution.certificate.label}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div style={{maxWidth: '900px', width: '100%', margin: '0 auto', marginTop: '30px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h3 style={{textAlign: 'center', marginBottom: '25px', fontSize: '2rem', color: 'white'}}>{educationData.skills.title}</h3>
              <div className="scroller" data-direction="right" data-speed="fast" style={{width: '100%'}}>
                <div className="scroller__inner">
                  {educationData.skills.row1.map((skill, index) => (
                    <img key={index} src={skill.image} style={{width: '100px', height: '100px'}} alt={skill.name} />
                  ))}
                </div>
              </div>
              <div className="scroller" data-direction="left" data-speed="fast" style={{marginTop: '15px', width: '100%'}}>
                <div className="scroller__inner">
                  {educationData.skills.row2.map((skill, index) => (
                    <img key={index} src={skill.image} style={{width: '100px', height: '100px'}} alt={skill.name} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="full-page-section" id="experience">
          <div className="container">
            <h2 className="section-title">{experienceData.title}</h2>

          {experienceData.companies.map(company => (
            <div key={company.id} className="company-section">
              <div className="company-header">
                <img src={company.logo} alt={company.name} className="company-logo" />
                <div className="company-info">
                  <h3 className="company-name">{company.name} — {company.position}</h3>
                  <p className="company-period">{company.period}</p>
                </div>
              </div>

              {company.projects.map(project => (
                <div key={project.id} className="project-section">
                  {project.title && <h4 className="project-title">{project.title}</h4>}
                  {project.techStack && (
                    <p className="tech-stack"><strong>Tech Stack:</strong> {project.techStack}</p>
                  )}
                  <p className="project-description">{project.description}</p>
                </div>
              ))}
            </div>
          ))}

          </div>
        </section>

        <section className="full-page-section" id="projects">
          <div className="container">
            <h2 className="section-title">{projectsData.title}</h2>
            
            <div className="row justify-content-center g-4">
              {projectsData.items.map(project => (
                <div key={project.id} className="col-lg-4 col-md-6">
                  <div className="project-card">
                    <h3 className="project-card-title">{project.title}</h3>
                    <p className="project-card-period">{project.period}</p>
                    <p className="project-card-subtitle">{project.subtitle}</p>
                    <p className="project-card-description">{project.description}</p>
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                        View on GitHub →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="full-page-section" id="contact">
          <div className="container">
            <h2 className="section-title">{contactData.title}</h2>
            <div className="contact-content">
              <p className="contact-description">{contactData.description}</p>

              <div className="contact-wrapper">
                {/* Contact Form */}
                <div className="contact-form-container">
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" name="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" name="email" placeholder="your.email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" rows="5" placeholder="Your message here..." value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Send Message</button>
                  </form>
                </div>

                {/* Contact Info */}
                <div className="contact-info">
                  <div className="contact-info-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <div>
                      <h4>Email</h4>
                      <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
                    </div>
                  </div>

                  <div className="social-links">
                    {contactData.socialLinks.map(link => (
                      <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link">
                        {link.name === 'LinkedIn' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        )}
                        {link.name === 'GitHub' && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        )}
                        {link.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="container">
          <p className="float-end"><a href="#">Back to top</a></p>
        </footer>
      </main>
    </>
  )
}

export default App
