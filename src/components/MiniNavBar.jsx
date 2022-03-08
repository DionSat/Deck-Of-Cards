import React from "react";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function MiniNavBar() {
  return (
    <Dropdown id="mininav" role="navigation">
      <Dropdown.Toggle variant="light">
        <img
          src="https://img.icons8.com/material/24/000000/menu--v1.png"
          alt="navigation menu icon"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu id="mininav-menu">
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 300 }}
          overlay={<Tooltip id="tooltip">Home</Tooltip>}
        >
          <Dropdown.Item href="/">
            <img
              src="https://img.icons8.com/windows/24/000000/home.png"
              alt="home icon"
            />
          </Dropdown.Item>
        </OverlayTrigger>

        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 300 }}
          overlay={<Tooltip id="tooltip">How to Play</Tooltip>}
        >
          <Dropdown.Item href="/how-to-play">
            <img
              src="https://img.icons8.com/material-outlined/24/000000/rules.png"
              alt="rules icon"
            />
          </Dropdown.Item>
        </OverlayTrigger>

        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 300 }}
          overlay={<Tooltip id="tooltip">Card Values</Tooltip>}
        >
          <Dropdown.Item href="/card-values">
            <img
              src="https://img.icons8.com/material/24/000000/roulette.png"
              alt="roulette icon"
            />
          </Dropdown.Item>
        </OverlayTrigger>

        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 300 }}
          overlay={<Tooltip id="tooltip">About Us</Tooltip>}
        >
          <Dropdown.Item href="/about-us">
            <img
              src="https://img.icons8.com/material/24/000000/info--v1.png"
              alt="info icon"
            />
          </Dropdown.Item>
        </OverlayTrigger>

        <Dropdown.Divider />
        <OverlayTrigger
          placement="left"
          delay={{ show: 250, hide: 300 }}
          overlay={<Tooltip id="tooltip">icon resources</Tooltip>}
        >
          <Dropdown.Item href="https://icons8.com/">
            <img
              src="https://img.icons8.com/material/24/000000/icons8-new-logo.png"
              alt="icons8 icon"
            />
          </Dropdown.Item>
        </OverlayTrigger>
      </Dropdown.Menu>
    </Dropdown>
  );
}
