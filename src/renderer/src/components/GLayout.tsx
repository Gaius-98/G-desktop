import { Layout } from 'antd'
const { Header, Sider, Content } = Layout
const GLayout = (): JSX.Element => {
  return (
    <Layout className="h-screen bg-white">
      <Header className="h-1/10 bg-white">Header</Header>
      <Layout hasSider>
        <Sider className="w-6 bg-white">Sider</Sider>
        <Content className="w-auto h-auto bg-white">Content</Content>
      </Layout>
    </Layout>
  )
}

export default GLayout
