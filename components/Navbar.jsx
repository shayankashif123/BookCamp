import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">FreeBookCamp</h1>

        <button
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
        >
          <span className="material-icons">menu</span>
        </button>
        <nav className="hidden md:block">
          <ul className="space-x-4 flex">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categories"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }
              >
                Categories
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/featured"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }
              >
                Featured Books
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }
              >
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }
              >
                <span className="material-icons">
                  search
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }
              >
                <span className="material-icons">
                  shopping_cart
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
        <div
          className={`fixed inset-0 bg-black/75 z-50 transition-opacity duration-300 ease-in ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          onClick={toggleMenu}
        >
          <div
            className={`fixed inset-y-0 right-0 w-1/2 bg-gray-800 shadow-lg p-6 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
              }`} 
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              className="absolute top-4 right-4 focus:outline-none text-white"
              onClick={toggleMenu}
            >
              <span className="material-icons">close</span> 
            </button>

            <ul className="space-y-4 mt-10">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'text-blue-400' : 'text-white hover:text-blue-400'
                  }
                  onClick={toggleMenu} 
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive ? 'text-blue-400' : 'text-white hover:text-blue-400'
                  }
                  onClick={toggleMenu}
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/featured"
                  className={({ isActive }) =>
                    isActive ? 'text-blue-400' : 'text-white hover:text-blue-400'
                  }
                  onClick={toggleMenu}
                >
                  Featured Books
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contacts"
                  className={({ isActive }) =>
                    isActive ? 'text-blue-400' : 'text-white hover:text-blue-400'
                  }
                  onClick={toggleMenu}
                >
                  Contacts
                </NavLink>
              </li>
              <li>
              <NavLink
                to="/search"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                } style={{color: 'white'}}
              >
                <span className="material-icons">
                  search
                </span>
              </NavLink>
            </li>
              <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                }
              >
                <span className="material-icons" style={{color: 'white'}}>
                  shopping_cart
                </span>
              </NavLink>
            </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;