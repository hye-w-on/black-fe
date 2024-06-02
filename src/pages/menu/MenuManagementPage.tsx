import { useEffect, useState } from 'react';

import { Action, CrudCode } from '../../models/common';
import { getManagementMenusApi } from '../../api/menuApi';
import MenuTree from './Tree/MenuTree';

export interface MenuAction extends Action {
  isChecked?: boolean;
  isExpand?: boolean;
  tempMenuNo?: string; //신규 메뉴 추가시 식별을 위하여 임시로 부여하는 ID
  //sortOrder: string;
}

export interface Menu extends MenuAction {
  menuNo: string;
  menuName: string;
  menuPath: string;
  parentMenuNo: string;
  sortOrder?: string;
  subMenus?: Menu[];
  //optional
  level?: number;
}

const mockMenus: Menu[] = [
  {
    //level: 0,
    menuNo: '1',
    menuName: '메뉴1',
    menuPath: '/menu1',
    parentMenuNo: '0',
    action: CrudCode.READ,
    subMenus: [
      {
        //level: 1,
        menuNo: '11',
        menuName: '메뉴1-1',
        menuPath: '/menu1-1',
        parentMenuNo: '1',
        action: CrudCode.READ,
        subMenus: [
          {
            //level: 2,
            menuNo: '111',
            menuName: '메뉴1-1-1',
            menuPath: '/menu1-1-1',
            parentMenuNo: '11',
            action: CrudCode.READ,
          },
        ],
      },
      {
        //level: 1,
        menuNo: '12',
        menuName: '메뉴1-2',
        menuPath: '/menu1-2',
        parentMenuNo: '1',
        action: CrudCode.READ,
      },
      {
        //level: 1,
        menuNo: '13',
        menuName: '메뉴1-3',
        menuPath: '/menu1-3',
        parentMenuNo: '1',
        action: CrudCode.READ,
      },
      {
        //level: 1,
        menuNo: '14',
        menuName: '메뉴1-4',
        menuPath: '/menu1-4',
        parentMenuNo: '1',
        action: CrudCode.READ,
      },
    ],
  },
  {
    //level: 0,
    menuNo: '2',
    menuName: '메뉴2',
    menuPath: '/menu2',
    parentMenuNo: '0',
    action: CrudCode.READ,
    subMenus: [
      {
        //level: 1,
        menuNo: '21',
        menuName: '메뉴2-1',
        menuPath: '/menu2-1',
        parentMenuNo: '2',
        action: CrudCode.READ,
      },
      {
        //level: 1,
        menuNo: '22',
        menuName: '메뉴2-2',
        menuPath: '/menu2-2',
        parentMenuNo: '2',
        action: CrudCode.READ,
      },
    ],
  },
];

const MenuManagementPage = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    const init = async () => {
      getManagementMenusApi().then((response) => {
        if (response.successOrNot === 'Y' && response.data) {
          setMenus(response.data);
        }
      });
    };
    init();
  }, []);

  return (
    <div>
      <MenuTree data={menus} expandLevel={2} hasCheckBox={true} />
    </div>
  );
};

export default MenuManagementPage;
