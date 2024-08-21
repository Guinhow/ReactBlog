import './Header.css'
import { Link } from 'react-router-dom';

const subMenu = [
  { name: 'Home', path: '/' },
  { name: 'Posts', path: '/Posts' },
  { name: 'Novo Post', path: '/Novo Post' },
  { name: 'Contato', path: '/Contato' }
];


function Header() {
  return (
    <div className="header">
      <nav className="navbar">
        <ul className="lista">
          {subMenu.map((x) => (<li className='itens' key={x.name}>
            <Link to={x.path} className='menu-link'>{x.name}</Link>
          </li>))}
        </ul>
      </nav>
      <div className="usuario">
        <button className="itens botao">Sign-up</button>
        <Link to="/login" className="itens botao">Login</Link>
        {/* <button className="itens botao">Login</button> */}
      </div>
    </div>
  )
}

export default Header;