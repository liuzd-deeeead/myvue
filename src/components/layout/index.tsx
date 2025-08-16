import React from 'react';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import {Outlet, useNavigate} from 'react-router-dom';

import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;
interface menuListItem {
    key:string,
    label:string,
    icon?:React.ReactElement,
    children?:ImenuList
}
type ImenuList = menuListItem[]
const menuList: ImenuList = [
    {
        icon: React.createElement(UserOutlined),
        key:'/',
        label:'工作台',
        children: [
            {
                icon: React.createElement(UserOutlined),
                key:'/',
                label:'工作台1',
            }
        ]
    } ,{
        icon: React.createElement(LaptopOutlined),
        key:'/1',
        label:'采购需求计划管理',
        children: [
            {
                icon: React.createElement(UserOutlined),
                key:'/test',
                label:'采购需求计划',
            }
        ]
    }
]


interface MyComponentProps {
    children?: React.ReactNode; // 可选属性
}

const App: React.FC<MyComponentProps> = ({children}) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();

    const clickMenu = (item)=>{
        navigate(item.key); // 跳转到仪表盘
    }
    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
            </Header>
            <Layout>
                <Sider width={200} style={{ background: colorBgContainer }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                        items={menuList}
                        onClick={clickMenu}
                    />
                </Sider>
                <Layout style={{ padding: '0 24px 24px' ,height: 'calc( 100vh - 64px )'}}>
                    <Breadcrumb
                        items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                        style={{ margin: '16px 0' }}
                    />
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {/*{children}*/}
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;