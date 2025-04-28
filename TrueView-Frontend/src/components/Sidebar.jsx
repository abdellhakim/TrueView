import { LogOut, ChevronLast, ChevronFirst, UserCheck } from "lucide-react";
import { useContext, createContext, useState, useEffect } from "react";
import logo from "@/assets/logo.png";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [error, setError] = useState('');

  const token = localStorage.getItem('token'); // Retrieve token from localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user information.');
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <a href="/">
          <img 
            src={logo}
            className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}
            alt="Logo"
          /></a>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 fixed bottom-0 left-0 bg-white z-50">
          <UserCheck className="w-10 h-10 rounded-md" />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all  ${expanded ? "w-52 ml-3" : "w-0"}`}
          >
            <a href="/profile">
              <div className="leading-4">
                <h4 className="font-semibold">{userData.username || 'Loading...'}</h4>
                <span className="text-xs text-gray-600">{userData.email || 'Loading...'}</span>
              </div>
            </a>
            <a href="/" className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
              <LogOut size={20} />
            </a>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, onClick }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      onClick={onClick}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
