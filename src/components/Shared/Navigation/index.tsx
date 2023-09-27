import { Link } from "react-router-dom";

function Navigation() {
  return (
    <>
      <header className="masthead mb-auto">
        <div className="inner">
          <h3 className="masthead-brand">CoinConvertPro</h3>
          <nav className="nav nav-masthead justify-content-center">
            <Link className="nav-link" to="/">Home</Link>
            <Link className="nav-link" to="/example">Example</Link>
            <a className="nav-link" href="#">Features</a>
            <a className="nav-link" href="#">Contact</a>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Navigation;
