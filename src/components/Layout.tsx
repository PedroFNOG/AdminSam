import React, { useState, ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Activity,
  Shield,
  Server,
  Package,
  Play,
  Bell,
  Search
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { admin, logout, hasPermission } = useAuth();
  const { notifications, removeNotification, clearAllNotifications } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', module: 'dashboard', action: 'visualizar' },
    { icon: Users, label: 'Revendas', path: '/revendas', module: 'revendas', action: 'visualizar' },
    { icon: Package, label: 'Planos Revenda', path: '/planos-revenda', module: 'planos_revenda', action: 'visualizar' },
    { icon: Play, label: 'Planos Streaming', path: '/planos-streaming', module: 'planos_streaming', action: 'visualizar' },
    { icon: Activity, label: 'Streamings', path: '/streamings', module: 'streamings', action: 'visualizar' },
    { icon: Server, label: 'Servidores', path: '/servidores', module: 'servidores', action: 'visualizar' },
    { icon: Settings, label: 'Administradores', path: '/administradores', module: 'administradores', action: 'visualizar' },
    { icon: Shield, label: 'Perfis de Acesso', path: '/perfis', module: 'perfis', action: 'visualizar', superAdminOnly: true },
    { icon: Settings, label: 'Configurações', path: '/configuracoes', module: 'configuracoes', action: 'visualizar' },
    { icon: FileText, label: 'Logs', path: '/logs', module: 'logs', action: 'visualizar' },
    { icon: User, label: 'Perfil', path: '/perfil', alwaysShow: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between h-20 px-6 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white">
          <div className="flex items-center space-x-3">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-8 sm:h-12 w-auto drop-shadow-lg"
            />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden hover:bg-white/20 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="mt-6 px-4">
          {menuItems.map((item) => (
            // Verificar permissões
            (item.superAdminOnly && admin?.nivel_acesso !== 'super_admin') ||
            (!item.alwaysShow && !hasPermission(item.module || '', item.action || '')) ? null : (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 mb-2 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-purple-700 transition-all duration-200 group ${
                location.pathname === item.path ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 shadow-lg border-l-4 border-purple-600' : ''
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <div className={`p-2 rounded-lg mr-3 transition-colors ${
                location.pathname === item.path ? 'bg-purple-200' : 'bg-gray-100 group-hover:bg-purple-200'
              }`}>
                <item.icon size={18} className={location.pathname === item.path ? 'text-purple-700' : 'text-gray-600 group-hover:text-purple-700'} />
              </div>
              <span className="font-medium text-sm sm:text-base">{item.label}</span>
            </Link>
            )
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                {admin?.nome.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-xs sm:text-sm font-medium text-gray-700 truncate max-w-32">{admin?.nome}</p>
                <p className="text-xs text-purple-600 font-semibold capitalize">{admin?.nivel_acesso?.replace('_', ' ')}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
              title="Sair"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-72">
        {/* Header */}
        <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200/50">
          <div className="flex items-center justify-between h-20 px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4 bg-gray-50 rounded-full px-4 py-2">
                <Search size={18} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar..." 
                  className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400"
                />
              </div>
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {notifications.length > 0 ? (
                    <BellRing size={20} className="text-gray-600" />
                  ) : (
                    <Bell size={20} className="text-gray-600" />
                  )}
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length > 9 ? '9+' : notifications.length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Notificações</h3>
                      {notifications.length > 0 && (
                        <button
                          onClick={() => {
                            clearAllNotifications();
                            setNotificationsOpen(false);
                          }}
                          className="text-sm text-blue-600 hover:text-blue-800"
                        >
                          Limpar todas
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">
                          <Bell size={24} className="mx-auto mb-2 text-gray-300" />
                          <p>Nenhuma notificação</p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              </div>
                              <button
                                onClick={() => removeNotification(notification.id)}
                                className="text-gray-400 hover:text-gray-600 ml-2"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:block">Sistema Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Notifications Overlay */}
      {notificationsOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setNotificationsOpen(false)}
        />
      )}
    </div>
  );
};