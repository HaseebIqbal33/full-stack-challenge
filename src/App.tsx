import React, { useState } from "react";
import {
  Navbar,
  Container,
  Form,
  Col,
  Row,
  Button,
  Card,
} from "react-bootstrap";
import "./App.css";
import { getShowsBySearch } from "./services/getShows";

interface Show {
  Name?: string;
  IMDb?: string;
  Source?: string;
  Age?: string;
}

interface ShowList {
  ID: string;
  Title: string;
  Year: string;
  Age: string;
  IMDb: string;
  "Rotten Tomatoes": string;
  Netflix: string;
  Hulu: string;
  "Prime Video": string;
  "Disney+": string;
  Type: string;
}

function App() {
  const [search, setSearch] = useState<string>("");
  const [show, setShow] = useState<Show>({});
  const [showList, setShowList] = useState([]);
  const [message, setMessage] = useState("");

  const saveData = (data: string) => {
    setSearch(data);
  };

  const getData = () => {
    getShowsBySearch(search).then((res) => {
      if (res.message) {
        setMessage(res.message);
        setShowList([]);
        setShow({});
      }
      if (res.data.length) {
        setShowList(res.data);
        setShow({});
        setMessage("");
      } else {
        setShow(res.data);
        setShowList([]);
        setMessage("");
      }
    });
  };

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">TvShows.com</Navbar.Brand>
        </Container>
      </Navbar>
      <h3 className="p-3 text-center">Welcome to TvShow.com</h3>
      <Form>
        <Row className={"w-100 d-flex justify-content-center"}>
          <Col xs={5}>
            <Form.Control
              value={search}
              placeholder="Search Tv Shows by Name or by Age"
              onChange={(event) => saveData(event.target.value)}
            />
          </Col>
          <Col xs={1}>
            <Button variant="warning" onClick={() => getData()}>
              <svg width="15px" height="15px">
                <path d="M11.618 9.897l4.224 4.212c.092.09.1.23.02.312l-1.464 1.46c-.08.08-.222.072-.314-.02L9.868 11.66M6.486 10.9c-2.42 0-4.38-1.955-4.38-4.367 0-2.413 1.96-4.37 4.38-4.37s4.38 1.957 4.38 4.37c0 2.412-1.96 4.368-4.38 4.368m0-10.834C2.904.066 0 2.96 0 6.533 0 10.105 2.904 13 6.486 13s6.487-2.895 6.487-6.467c0-3.572-2.905-6.467-6.487-6.467 "></path>
              </svg>
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="p-3">
        {Object.keys(show).length !== 0 ? (
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{show.Name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {show.Source}
              </Card.Subtitle>
              <div>
                <span className="fw-bold">IMBDb:</span> {show.IMDb}
              </div>
              <span className="fw-bold">Age:</span> {show.Age}
            </Card.Body>
          </Card>
        ) : null}
        <Row>
          {showList.length
            ? showList.map((show: ShowList) => {
                return (
                  <Col>
                    <Card style={{ width: "18rem" }} className="mb-3">
                      <Card.Body>
                        <Card.Title>{show.Title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {show.Netflix === "1"
                            ? "Netflix"
                            : show.Hulu === "1"
                            ? "Hulu"
                            : show["Prime Video"] === "1"
                            ? "Prime Video"
                            : "Disney+"}
                        </Card.Subtitle>
                        <div>
                          <span className="fw-bold">IMBDb:</span> {show.IMDb}
                        </div>
                        <span className="fw-bold">Age:</span> {show.Age}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            : null}
        </Row>
        {message ? <p className="pt-2 text-center">{message}</p> : null}
      </div>
    </div>
  );
}

export default App;
