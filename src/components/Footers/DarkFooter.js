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
                
                target="_blank"
              >
                USCL 
              </a>
            </li>
            <li>
              <a
               
                target="_blank"
              >
               </a>
            </li>
            <li>
              <a
              
                target="_blank"
              >
                
              </a>
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, Designed {" "}
          <a
            href=""
            target="_blank"
          >
            & 
            <a> </a>
          </a>
            Coded by{" "}
          <a
            href=""
            target="_blank"
          >
            USCL
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default DarkFooter;
