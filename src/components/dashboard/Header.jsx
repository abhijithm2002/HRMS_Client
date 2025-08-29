// import React, { useState } from 'react';
// import './Header.css';
// import { useAuth } from '../../hooks/useAuth';

// const Header = () => {
//   const { user, logout } = useAuth();
//   const [showUserMenu, setShowUserMenu] = useState(false);

//   const handleLogout = () => {
//     logout();
//     setShowUserMenu(false);
//   };

//   return (
//     <header className="dashboard-header">
//       <div className="header-content">
//         <div className="header-left">
//           <h1 className="header-title">Candidates</h1>
//         </div>
        
//         <div className="header-right">
//           <div className="header-icons">
//             <button className="icon-btn" aria-label="Mail">
//               <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//               </svg>
//             </button>
            
//             <button className="icon-btn" aria-label="Notifications">
//               <svg className="header-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.83 10.83a4 4 0 015.66-5.66l1.25 1.25m0 0l1.38 1.38a4 4 0 015.66 5.66l-1.25 1.25m0 0l-1.38 1.38a4 4 0 01-5.66-5.66l1.25-1.25m0 0l-1.38-1.38a4 4 0 00-5.66 5.66l1.25 1.25" />
//               </svg>
//             </button>
//           </div>
          
//           <div className="user-menu">
//             <button 
//               className="user-profile-btn"
//               onClick={() => setShowUserMenu(!showUserMenu)}
//               aria-label="User menu"
//             >
//               <div className="user-avatar">
//                 <svg className="avatar-icon" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
//                 </svg>
//               </div>
//               <svg className="chevron-down" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
            
//             {showUserMenu && (
//               <div className="user-dropdown">
//                 <div className="dropdown-item">
//                   <span>Profile</span>
//                 </div>
//                 <div className="dropdown-item">
//                   <span>Settings</span>
//                 </div>
//                 <div className="dropdown-divider"></div>
//                 <div className="dropdown-item" onClick={handleLogout}>
//                   <span>Logout</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
