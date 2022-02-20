import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import '../statics/css/pages/adminIndex.css';
import { PieChartOutlined, DesktopOutlined, UnorderedListOutlined, FileOutlined } from '@ant-design/icons'
import { Route } from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import Home from './home'
import LeftWord from './LeftWord'

const { Header, Content, Footer, Sider } = Layout;


function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false)
  const [defaultMenukey, setDefaultMenukey] = useState()
  const [menuName, setMenuName] = useState()
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };
  useEffect(() => {
    console.log(props.location.pathname)
    const route = props.location.pathname
    if (route === "/adminIndex/addArticle") {/**添加文章 */
      setDefaultMenukey("addArticle")
      setMenuName("添加文章")
    } else if (route === "/adminIndex/articleList") {/**文章列表 */
      setDefaultMenukey("articleList")
      setMenuName("文章列表")
    } else if (route === "/adminIndex") {/**工作台 */
      setDefaultMenukey("Home")
      setMenuName("工作台")
    } else if (route === "/adminIndex/leftWord") {/**留言管理 */
      setDefaultMenukey("leftWord")
      setMenuName("留言管理")
    }
  }, [])
  let history = useHistory();
  const handleClickArticle = e => {
    if (e.key === 'addArticle') {/**添加文章 */
      history.push('/adminIndex/addArticle')
      setDefaultMenukey('addArticle')
      setMenuName("添加文章")
    } else if (e.key === 'articleList') {/**文章列表 */
      history.push('/adminIndex/articleList')
      setDefaultMenukey('articleList')
      setMenuName("文章列表")
    } else if (e.key === 'Home') {/**工作台 */
      history.push('/adminIndex')
      setDefaultMenukey('Home')
      setMenuName("工作台")
    } else if (e.key === 'leftWord') {/**留言管理 */
      history.push('/adminIndex/leftWord')
      setDefaultMenukey('leftWord')
      setMenuName("留言管理")
    }
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo">
          {!collapsed && 'Berwin的博客后台'}
        </div>
        <Menu theme="dark" selectedKeys={[defaultMenukey]} mode="inline" onSelect={handleClickArticle}>
          <Menu.Item key="Home">
            <PieChartOutlined />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="articleList">
            <UnorderedListOutlined />
            <span>文章列表</span>
          </Menu.Item>
          <Menu.Item key="addArticle">
            <DesktopOutlined />
            <span>添加文章</span>
          </Menu.Item>
          <Menu.Item key="leftWord">
            <FileOutlined></FileOutlined>
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>{menuName}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Route path="/adminIndex" exact component={Home} /> {/**后台的首页 */}
            <Route path="/adminIndex/addArticle" exact component={AddArticle} />{/**添加文章 */}
            <Route path="/adminIndex/addArticle/:id" exact component={AddArticle} />{/**修改文章 */}
            <Route path="/adminIndex/articleList" exact component={ArticleList} />{/**文章列表 */}
            <Route path="/adminIndex/leftWord" exact component={LeftWord} />{/**留言管理 */}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Berwin.com</Footer>
      </Layout>
    </Layout>
  )

}

export default AdminIndex