import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Clock from './components/clock';
import  Settings  from "./components/settings";

const RouterComp = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene
                    key='clock'
                    component={Clock}
                    title='Clock'
                    hideNavBar={true}
                    initial
                    
                >

                </Scene>
            
                <Scene
                    key='settings'
                    component={Settings}
                    title='Ayarlar'
                >

                </Scene>
            </Scene>

        </Router>
    )
}

export default RouterComp;