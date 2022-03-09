interface Props {
    title: string
    logoSource: string
}

export const MainHeader: React.FC<Props> = ({ title, logoSource }) => (
    <header className="main-header">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">
            <img src={logoSource} className="react-logo App-logo" alt="logo" />
            {title}
        </a>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
        <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
                <a className="nav-link" href="/">Sign out</a>
            </li>
        </ul>
    </header>
)