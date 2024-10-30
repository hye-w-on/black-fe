import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

type Menu = {
  label: string;
  path?: string;
  subMenus?: SubMenu[];
};
type SubMenu = {
  label: string;
  path: string;
};

const mockMenus: Menu[] = [
  {
    label: 'Bbs-pagination-prefetch',
    path: '/domain/bbs',
  },
  {
    label: 'Reservation',
    path: '/domain/reservation',
  },
  {
    label: 'Feed',
    path: '/domain/feed',
  },
  {
    label: 'Todo-React.memo',
    path: '/domain/todo',
  },
  {
    label: 'Request',
    path: '/domain/request',
  },
  {
    label: 'Menu Management',
    path: '/admin/menu-management',
  },

  {
    label: 'login',
    subMenus: [
      {
        label: 'employee',
        path: '/login/employee',
      },
    ],
  },
];

const HorizonMenu = () => {
  const [menus] = useState<Menu[]>(mockMenus);
  const [subMenus, setSubMenus] = useState<SubMenu[]>([]);

  const handleMenuClick = (index: number) => {
    setSubMenus(menus[index].subMenus || []);
  };
  return (
    <nav>
      <StyledHeader>
        <MenuUl>
          {menus.map((menu, index) => {
            return (
              <MenuLi key={index}>
                {menu.path ? (
                  <Link to={menu.path}>
                    <div onClick={() => handleMenuClick(index)}>{menu.label}</div>
                  </Link>
                ) : (
                  <div onClick={() => handleMenuClick(index)}>{menu.label}</div>
                )}
              </MenuLi>
            );
          })}
        </MenuUl>
        <MenuUl>
          {subMenus.map((menu) => {
            return (
              <MenuLi>
                <Link to={menu.path}>{menu.label}</Link>
              </MenuLi>
            );
          })}
        </MenuUl>
      </StyledHeader>
    </nav>
  );
};

export default HorizonMenu;

//position: fixed;
const StyledHeader = styled.ul`
  display: flex;
  flex-direction: column;
  top: 0;
  z-index: 999;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MenuUl = styled.ul`
  display: flex;
  flex-direction: row;
`;

const MenuLi = styled.ul`
  margin: 10px;
`;
