import React, { useState } from 'react';
import RightMenu from './Sections/RightMenu';
import Search from './Search';
// import NavRouter from './Sections/NavRouter';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';

function NavBar() {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };

    return (
        <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%', height: '180px', display: 'flex', alignItems: 'center', flexDirection: 'column', borderBottom: 'solid 1px #EEEEEE' }}>
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', borderBottom: 'solid 1px #EEEEEE'}}>
                <div style={{width: '1100px'}}>
                    <div className="menu__container">
                        <div className="menu_rigth">
                            <RightMenu mode="horizontal" />
                        </div>
                        <Button
                            className="menu__mobile-button"
                            type="primary"
                            onClick={showDrawer}
                        >
                            <Icon type="align-right" />
                        </Button>
                        <Drawer
                            title="Basic Drawer"
                            placement="right"
                            className="menu_drawer"
                            closable={false}
                            onClose={onClose}
                            visible={visible}
                        >
                            {/* <LeftMenu mode="inline" /> */}
                            <RightMenu mode="inline" />
                        </Drawer>
                    </div>
                </div>
            </div>
            <div style={{width: '1100px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div className="menu__logo">
                    <a href="/">바니마켓</a>
                </div>
                <div style={{width: '920px', display: 'flex', justifyContent: 'space-between'}}>
                    <Search />
                    {/* <NavRouter /> */}
                </div>
            </div>
            <div style={{width: '1100px', height: '40px'}}>
                <div className="menu__logo">
                    <div>카테고리</div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar