function About() {
  return (
    <section className="aboutPage">
      <section className="introCard">
        <p className="smallLabel">Final Project Summary</p>

        <h2>About StreamList</h2>

        <p>
          StreamList is a React based progressive web application designed for
          EZTechMovie customer user events. The application allows users to
          manage a personal streaming watch list, search movie information
          through the TMDB API, and preserve saved user events across sessions.
        </p>
      </section>

      <section className="aboutGrid">
        <article className="aboutCard">
          <span className="material-symbols-outlined">route</span>
          <h3>Week 1, React Routing</h3>
          <p>
            The application was created with React, Vite, and React Router. The
            navigation system includes StreamList, Movies, Cart, and About pages.
          </p>
        </article>

        <article className="aboutCard">
          <span className="material-symbols-outlined">playlist_add_check</span>
          <h3>Week 2, User Events</h3>
          <p>
            Users can add, display, edit, delete, complete, and filter
            StreamList items directly on the page.
          </p>
        </article>

        <article className="aboutCard">
          <span className="material-symbols-outlined">database</span>
          <h3>Week 3, API and Storage</h3>
          <p>
            The Movies page retrieves information from TMDB, while localStorage
            keeps user entries available after refresh.
          </p>
        </article>

        <article className="aboutCard">
          <span className="material-symbols-outlined">bug_report</span>
          <h3>Week 4, AI Review</h3>
          <p>
            The code was reviewed with AI assistance to improve error handling,
            message consistency, and file level checks.
          </p>
        </article>

        <article className="aboutCard">
          <span className="material-symbols-outlined">install_desktop</span>
          <h3>Week 5, PWA Completion</h3>
          <p>
            The final version includes a manifest, icons, service worker, offline
            support, and desktop install capability.
          </p>
        </article>
      </section>
    </section>
  );
}

export default About;
