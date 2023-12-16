import { Layout } from 'antd'
const { Header, Sider, Content } = Layout
import GMenu from './GMenu'
import { useState } from 'react'
import { MenuItemType } from 'antd/es/menu/hooks/useItems'
import GContent, { AppInfo } from './GContent'
const GLayout = (): JSX.Element => {
  const [list, setList] = useState<MenuItemType[]>([{ key: 1, label: '测试1', title: '测试标题' }])
  const [appList, setAppList] = useState<AppInfo[]>([])
  return (
    <Layout className="h-screen bg-white">
      <Header className="h-1/10 bg-white">Header</Header>
      <Layout hasSider className="bg-white">
        <Sider className="w-6 bg-white">
          <GMenu list={list} setList={setList}></GMenu>
        </Sider>
        <Content className="w-auto h-auto bg-white">
          <GContent appList={appList} setAppList={setAppList}></GContent>
        </Content>
      </Layout>
    </Layout>
  )
}

export default GLayout
