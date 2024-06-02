/**
 * @description
 * - createContext : Context를 사용한 상태관리
 * - 배열 불변성 CUD
 */
import React, { createContext, useState, useEffect } from 'react';

import styled from '@emotion/styled';
import { Menu } from '../MenuManagementPage';
import MenuTreeItem from './MenuTreeItem';
import { v4 as uuidv4 } from 'uuid';
import { CrudCode } from '../../../models/common';

export interface MenuTreeProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  data: Menu[];
  expandLevel?: number;
  hasCheckBox?: boolean;
}

/**
 * MenuTree 하위에 Context를 사용하여 상태관리
 */
export type MenuTreeContextType = {
  menusContextValue: Menu[];
  updateMenusContextValue: (value: Menu[]) => void;
  deleteMenuItem: (menuNo: string) => void;
  insertChildMenuItem: (menuNo: string) => void;
  updateMenuItem: (menuNo: string, menu: Menu) => void;
  updateMenuOrder: (targetMenu: Menu, orderDifference: number) => void;
};

export const MenuTreeContext = createContext<MenuTreeContextType>({
  //_변수명: 의도적으로 해당 변수를 사용하지 않음을 명시
  menusContextValue: [],
  updateMenusContextValue: (_value: Menu[]) => {},
  deleteMenuItem: (_menuNo: string) => {},
  insertChildMenuItem: (_menuNo: string) => {},
  updateMenuItem: (_menuNo: string, _menu: Menu) => {},
  updateMenuOrder: (_targetMenu: Menu, _orderDifference: number) => {},
});

const MenuTree = (props: MenuTreeProps) => {
  const [menusContextValue, setMenusContextValue] = useState<Menu[]>(props.data);

  const updateMenusContextValue = (value: Menu[]) => {
    setMenusContextValue(value);
  };

  /**
   * @deprecated
   * @description
   * 메뉴리스트에서 targetNo로 특정 메뉴 1개를 삭제하는 함수
   * subMenus의 불변성 위반으로 사용하지 않음
   */
  const deleteMenuWithRecursiveOld = (menus: Menu[], targetMenuNo: string): Menu[] => {
    return menus.filter((menu) => {
      if (menu.menuNo === targetMenuNo) {
        return false;
      }
      if (menu.subMenus) {
        menu.subMenus = deleteMenuWithRecursiveOld(menu.subMenus, targetMenuNo); //객체의 값을 직접 변경하는 것은 불변성 위반
      }
      return true;
    });
  };
  /**
   * @description
   * 메뉴리스트에서 targetNo로 특정 메뉴 1개를 삭제하는 함수
   * 재귀문
   * subMenus의 불변성을 지키기 위해 action값을 D로 변경하고(map) filter로 제거
   */
  const deleteMenuWithRecursive = (menus: Menu[], targetMenuNo: string): Menu[] => {
    return menus
      .map((menu) => {
        if ((menu.menuNo && menu.menuNo === targetMenuNo) || menu.tempMenuNo === targetMenuNo) {
          return { ...menu, action: CrudCode.DELETE };
        }
        //현재 레벨에 target이 없다면 하위레벨 검색 및 삭제
        if (menu.subMenus) {
          return { ...menu, subMenus: deleteMenuWithRecursive(menu.subMenus, targetMenuNo) };
        }
        //현재 레벨에 target이 없고, 하위메뉴가 없다면 그대로 반환
        return menu;
      })
      .filter((menu) => menu.action !== CrudCode.DELETE);
  };

  const deleteMenuItem = (menuNo: string) => {
    setMenusContextValue(deleteMenuWithRecursive(menusContextValue, menuNo));
  };

  /**
   * @description
   * targetNo로 자식 메뉴 1개를 추가하는 함수
   */
  const insertChildMenuWithRecursive = (menus: Menu[], targetmenuNo: string): Menu[] => {
    return menus.map((menu) => {
      if ((menu.menuNo && menu.menuNo === targetmenuNo) || menu.tempMenuNo === targetmenuNo) {
        const newMenu = {
          menuNo: '',
          tempMenuNo: uuidv4(),
          menuName: '',
          menuPath: '/',
          parentMenuNo: menu.menuNo,
          action: CrudCode.CREATE,
          sortOrder: menu.subMenus ? String(menu.subMenus.length) : '0',
        };
        return {
          ...menu,
          subMenus: menu.subMenus ? [...menu.subMenus, newMenu] : [newMenu],
        };
      }
      if (menu.subMenus) {
        return { ...menu, subMenus: insertChildMenuWithRecursive(menu.subMenus, targetmenuNo) };
      }
      return menu;
    });
  };

  const insertChildMenuItem = (menuNo: string) => {
    setMenusContextValue(insertChildMenuWithRecursive(menusContextValue, menuNo));
  };

  /**
   * @description
   * targetNo로 메뉴 내용을 변경하는 함수
   */
  const updateMenuWithRecursive = (menus: Menu[], targetMenuNo: string, newMenu: Menu): Menu[] => {
    return menus.map((menu) => {
      if ((menu.menuNo && menu.menuNo === targetMenuNo) || menu.tempMenuNo === targetMenuNo) {
        return { ...newMenu, menuNo: menu.menuNo };
      }
      if (menu.subMenus) {
        return { ...menu, subMenus: updateMenuWithRecursive(menu.subMenus, targetMenuNo, newMenu) };
      }
      return menu;
    });
  };

  const updateMenuItem = (menuNo: string, menu: Menu) => {
    setMenusContextValue(updateMenuWithRecursive(menusContextValue, menuNo, menu));
  };

  /**
   * @description
   * 메뉴의 위치를 변경하는 함수
   */
  const updateMenuOrderWithRecursive = (
    menus: Menu[],
    targetMenu: Menu,
    orderDifference: number
  ): Menu[] => {
    return menus.map((menu) => {
      if (menu.menuNo === targetMenu.parentMenuNo) {
        //유효성 검사 : 서브 메뉴 미존재
        if (!menu.subMenus || menu.subMenus.length === 0) return menu;

        const sourceIndex = menu.subMenus.findIndex(
          (subMenu) => subMenu.menuNo === targetMenu.menuNo
        );
        const targetIndex = sourceIndex + orderDifference;
        //유효성 검사 : sourceIndex가 -1이면 해당 메뉴가 존재하지 않음
        if (sourceIndex < 0) return menu;
        //유효성 검사 : 최대최소 범위를 벗어남
        if (targetIndex < 0 || targetIndex >= menu.subMenus?.length) return menu;

        //subMenus의 순서를 변경
        const newSubMenus = menu.subMenus?.map((subMenu, index) => {
          if (targetIndex === index) {
            return {
              ...targetMenu,
              sortOrder: String(index),
              action: CrudCode.UPDATE,
            };
          } else if (orderDifference < 0 && targetIndex < index && sourceIndex >= index) {
            //위로 이동
            if (!menu.subMenus) return subMenu;
            return {
              ...menu.subMenus[index - 1],
              sortOrder: String(index),
              action: CrudCode.UPDATE,
            };
          } else if (orderDifference > 0 && targetIndex > index && sourceIndex <= index) {
            //아래로 이동
            if (!menu.subMenus) return subMenu;
            return {
              ...menu.subMenus[index + 1],
              sortOrder: String(index),
              action: CrudCode.UPDATE,
            };
          } else {
            return subMenu;
          }
        });
        return { ...menu, subMenus: newSubMenus };
      }
      if (menu.subMenus) {
        return {
          ...menu,
          subMenus: updateMenuOrderWithRecursive(menu.subMenus, targetMenu, orderDifference),
        };
      }
      return menu;
    });
  };

  const updateMenuOrder = (targetMenu: Menu, orderDifference: number) => {
    setMenusContextValue(
      updateMenuOrderWithRecursive(menusContextValue, targetMenu, orderDifference)
    );
  };

  useEffect(() => {
    setMenusContextValue(props.data);
  }, [props.data]);

  return (
    <>
      <StyledTree>
        <MenuTreeContext.Provider
          value={{
            menusContextValue,
            updateMenusContextValue,
            deleteMenuItem,
            insertChildMenuItem,
            updateMenuItem,
            updateMenuOrder,
          }}
        >
          <>
            {menusContextValue?.map((menu, index) => {
              return (
                <MenuTreeItem
                  key={index}
                  level={0}
                  menuData={menu}
                  expandLevel={props.expandLevel}
                  hasCheckBox={props.hasCheckBox}
                />
              );
            })}
            {props.children}
          </>
        </MenuTreeContext.Provider>
      </StyledTree>
    </>
  );
};

export default MenuTree;

const StyledTree = styled.span`
  margin: 10px;
`;
