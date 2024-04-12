import React from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useLocation } from "react-router-dom";

/***
 *  Home component
 * 
 *
 * 
 *  
 * 
*/
function Home() {
  const location = useLocation();  

  return (
    <section className="col-md-8">
      <Card>
        <CardBody className="text-center">
          <CardTitle>
              {location.state && location.state.welcomeMessage && (
                <p className="font-weight-bold">{location.state.welcomeMessage}</p>
              )}
          </CardTitle>
        </CardBody>
      </Card>
    </section>
  );
}

export default Home;
