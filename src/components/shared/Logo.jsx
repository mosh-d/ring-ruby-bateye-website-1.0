import { NavLink } from "react-router-dom";

import logo from "../../assets/ring-ruby-logo.png";

export default function Logo() {
  return (
    <div className="w-[12rem] flex-shrink-0">
      <NavLink to="/">
        <img src={logo} alt="Ring Ruby Hotel Logo" />
      </NavLink>
    </div>
  );
}
