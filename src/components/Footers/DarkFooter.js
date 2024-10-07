/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function DarkFooter() {
  return (
    <footer className="footer" data-background-color="black">
      <Container>
        <nav>
          <ul>
            <li>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                USCL 
              </a>
            </li>
            <li>
              <a
                href="/Sree Teq's.Privacy Policy.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/Sree teq's.Terms and Conditions.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed{" "}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            & Coded by{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              USCL
            </a>
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
