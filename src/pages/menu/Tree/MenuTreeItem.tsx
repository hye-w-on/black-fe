import React, { useContext, useState } from 'react';
import styled from '@emotion/styled';
//icon
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { MenuTreeContext, MenuTreeContextType } from './MenuTree';
import { Menu } from '../MenuManagementPage';
import { CrudCode } from '../../../models/common';

import { ActionButton } from '../../../components/atoms/Button';
import { BasicTextField } from '../../../components/atoms/TextField';

interface TreeItemProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  menuData: Menu;
  // 개별 속성
  level: number;
  isExpand?: boolean;
  isChecked?: boolean;
  // 공통 속성 : TODO: Context로 분리가능
  expandLevel?: number;
  hasCheckBox?: boolean;
}

const MenuTreeItem = (props: TreeItemProps) => {
  const { insertChildMenuItem, updateMenuItem, deleteMenuItem, updateMenuOrder } =
    useContext<MenuTreeContextType>(MenuTreeContext);

  const temp = props.isExpand
    ? true
    : props?.expandLevel
      ? props.expandLevel >= props.level
        ? false
        : true
      : false;
  const [isExpand, setIsExpand] = useState(temp);
  //const [isChecked, setIsChecked] = useState<boolean>(props.isChecked || false);
  const [editedMenuName, setEditedMenuName] = useState<string>(props.menuData.menuName);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <StyledTreeItem>
      <>
        <MenuInfo>
          <span
            onClick={() => {
              setIsExpand((prev) => !prev);
            }}
          >
            {/* 아이콘 */}
            {props.menuData?.subMenus && props.menuData.subMenus.length > 0 ? (
              isExpand ? (
                <ArrowDropUpIcon />
              ) : (
                <ArrowDropDownIcon />
              )
            ) : (
              <ArrowRightIcon />
            )}
          </span>
          {props.hasCheckBox && (
            <input
              type="checkbox"
              checked={props.isChecked}
              onChange={() => {
                updateMenuItem(props.menuData.menuNo, {
                  ...props.menuData,
                  isChecked: props.isChecked ? !props.isChecked : true,
                });
              }}
            />
          )}
          {/* 메뉴명 */}
          {isEditing ? (
            <BasicTextField
              //label="ManuName"
              value={editedMenuName}
              onChange={(e) => {
                setEditedMenuName(e.target.value);
              }}
            />
          ) : (
            <span
              onClick={() => {
                setIsExpand((prev) => !prev);
              }}
            >
              {props.menuData.menuName}
            </span>
          )}
        </MenuInfo>
        <ActionButton
          onClick={() => {
            setIsExpand(true);
            insertChildMenuItem(props.menuData.menuNo);
          }}
        >
          <AddIcon fontSize="inherit" />
        </ActionButton>
        <ActionButton
          onClick={() => {
            if (props.menuData.action === CrudCode.CREATE) {
              deleteMenuItem(props.menuData.tempMenuNo || '');
            } else {
              deleteMenuItem(props.menuData.menuNo);
            }
          }}
        >
          <RemoveIcon fontSize="inherit" />
        </ActionButton>
        <ActionButton
          onClick={() => {
            if (isEditing) {
              updateMenuItem &&
                updateMenuItem(props.menuData.menuNo, {
                  ...props.menuData,
                  menuName: editedMenuName,
                });
              setIsEditing(false);
            } else {
              setIsEditing(true);
            }
          }}
        >
          <EditIcon fontSize="inherit" />
        </ActionButton>
        {/* 정렬순서 위로 */}
        <ActionButton
          onClick={() => {
            updateMenuOrder(props.menuData, -1);
          }}
        >
          <KeyboardArrowUpIcon fontSize="inherit" />
        </ActionButton>
        {/* 정렬순서 아래로 */}
        <ActionButton
          onClick={() => {
            updateMenuOrder(props.menuData, 1);
          }}
        >
          <KeyboardArrowDownIcon fontSize="inherit" />
        </ActionButton>
        {/* 메뉴 부가정보*/}
        {props.menuData.menuNo} | {props.menuData.sortOrder} | {props.menuData.tempMenuNo} |{' '}
        {props.menuData.action}
        {/* 하위 메뉴 */}
        {props.children}
        {props.menuData.subMenus &&
          isExpand &&
          props.menuData.subMenus.map((subMenu, index) => {
            return (
              <MenuTreeItem
                key={index}
                level={props.level + 1}
                menuData={subMenu}
                expandLevel={props.expandLevel}
                hasCheckBox={props.hasCheckBox}
              />
            );
          })}
      </>
    </StyledTreeItem>
  );
};

export default MenuTreeItem;
const StyledTreeItem = styled.div`
  margin: 0px 0px 0px 10px;
  border: solid black;
  border-width: 0px 0px 0px 1px;
  cursor: pointer;
  align-items: center;
`;

const MenuInfo = styled.span`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  width: 100px;
  margin: 5px;
  height: 35px;
`;
