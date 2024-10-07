import React from "react";
import { Container } from "reactstrap";

function IndexHeader() {
  const pageHeader = React.useRef(null);

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        if (pageHeader.current) { // Check if pageHeader.current is not null
          const windowScrollTop = window.pageYOffset / 3;
          pageHeader.current.style.transform = `translate3d(0, ${windowScrollTop}px, 0)`;
        }
      };
      window.addEventListener("scroll", updateScroll);

      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  }, []); // Empty dependency array ensures this runs once after the initial render

  return (
    <>
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: `url(${require("assets/img/header.jpg")})`
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="content-center brand">
            <img
              alt="..."
              className="n-logo"
              src={require("assets/img/now-logo.png")}
            ></img>
            <h1 className="h1-seo">Sree Teq’s Services</h1>
            <h3>On-Demand AC Mechanic Solutions</h3>
          </div>
          <h6 className="category category-absolute">
            Designed & {" "}
            Coded by{" "}
            <a>USCL</a>
          </h6>
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
