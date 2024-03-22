import * as React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function NavbarMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  return (
    <div>
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ backgroundColor: "#ed8936", color: "white" }}
        className="Btn hover:BtnHover active:BtnActive "
      >
      <div class="sign">
          <svg class="w-6 h-6" viewBox="0 0 512 512">
            <path
              fill="white"
              d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
            ></path>
          </svg>
        </div>

        <div class="text">Login</div>
        {/* <span>Login</span>
        <span className="font-semibold">
          <AiOutlineDown />
        </span> */}
      </button>

      {/* <button class="Btn hover:BtnHover active:BtnActive">
        <div class="sign">
          <svg class="w-6 h-6" viewBox="0 0 512 512">
            <path
              fill="white"
              d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
            ></path>
          </svg>
        </div>

        <div class="text">Login</div>
      </button> */}

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => navigate("/signin")}> User Login</MenuItem>
        {/* <MenuItem onClick={() => navigate('/signup')}>Sign Up</MenuItem> */}
        <MenuItem onClick={() => navigate("/loginProvider")}>
          Provider Login
        </MenuItem>
        {/* <MenuItem onClick={() => navigate('/registerProvider')}>Provider Registration</MenuItem> */}
      </Menu>
    </div>
  );
}
