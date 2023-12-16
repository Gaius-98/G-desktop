import { Menu } from 'antd'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import { Dispatch, ReactNode, SetStateAction } from 'react'
interface MenuProps {
  list: MenuItemType[]
  setList: Dispatch<SetStateAction<MenuItemType[]>>
}
const GMenu = (props: MenuProps): ReactNode => {
  const { list } = props
  return <Menu items={list}></Menu>
}
export default GMenu
