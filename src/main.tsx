import React from 'react';
import { StatusBar } from 'react-native';
import { Dispatch } from 'redux';
import {
  TYSdk,
  NavigatorLayout,
  NavigationOptions,
  DeprecatedNavigator,
  DeprecatedNavigatorRoute,
} from 'tuya-panel-kit';
import composeLayout from './composeLayout';
import { store, ReduxState } from './models';
import Strings from './i18n/index';
import Home from './pages/home/index';
import Setting from './pages/setting/index';
import Zone1 from './pages/charts/zone1/index';
import Zone2 from './pages/charts/zone2/index';
import Climate from './pages/charts/climate/index';

console.disableYellowBox = true;

type Props = ReduxState & { dispatch: Dispatch };

// 慎用，生成环境上不要开启，console 打印层次过深会导致性能问题
// if (__DEV__) {
//   console.log('TYSdk :', TYSdk);
// }

class MainLayout extends NavigatorLayout<Props> {
  /**
   *
   * @desc hookRoute 可以在这里针对特定路由做一些控制处理，
   * 具体可控制的参数可参考 NavigationOptions 类型描述
   */
  hookRoute(route: DeprecatedNavigatorRoute): NavigationOptions {
    const routeProps: NavigationOptions = {};
    switch (route.id) {
      case 'main':
        break;
      case 'setting':
        routeProps.title = 'Setting';
        routeProps.background = {
          '3%': '#f82232',
          '90%': '#FF624C',
        };
        break;
      case 'SettingScene':
        routeProps.title = Strings.getLang('mainSettings');
        routeProps.topbarTextStyle = { color: '#474747', fontWeight: 'bold', fontSize: 20 };
        routeProps.background = {
          '3%': '#FFFFFF',
          '90%': '#FFFFFF',
        };
        break;
      case 'ChartClimateScene':
        routeProps.title = Strings.getLang('programmW');
        routeProps.background = {
          '3%': '#FFFFFF',
          '90%': '#FFFFFF',
        };
        break;
      case 'ChartZone1Scene':
        routeProps.title = Strings.getLang('programmW');
        routeProps.background = {
          '3%': '#FFFFFF',
          '90%': '#FFFFFF',
        };
        break;
      case 'ChartZone2Scene':
        routeProps.title = Strings.getLang('programmW');
        routeProps.background = {
          '3%': '#FFFFFF',
          '90%': '#FFFFFF',
        };
        break;
      default:
        break;
    }

    return {
      ...routeProps,
      renderStatusBar: () => <StatusBar barStyle="default" />,
    };
  }

  /**
   * @desc
   * 在此您可以通过 route 中的 ID 来判断使用哪个页面组件
   * 如果有额外的 props 需要传递给页面组件的，可以在此进行传递
   * 注意：route 参数来自于 TYSdk.Navigator.push，
   * 如果调用了 TYSdk.Navigator.push({ id: 'setting', title: 'Setting Page' });
   * 则会在推入路由栈时 hookRoute 和 renderScene 这个周期里会接受到 route = { id: 'setting', title: 'Setting Page' }，
   * 但要注意的是，首页的 route 参数是固定的，为 { 'id': 'main', 'initialRoute': true }
   *
   * @param {Object} route - route对象
   * @param {object} navigator - Navigator对象，具体使用方法可参考https://facebook.github.io/react-native/docs/0.43/navigator.html
   */
  renderScene(route: DeprecatedNavigatorRoute, navigator: DeprecatedNavigator) {
    let component;
    switch (route.id) {
      case 'main':
        component = <Home />;
        break;
      case 'SettingScene':
        component = <Setting />;
        break;
      case 'ChartClimateScene':
        component = <Climate />;
        break;
      case 'ChartZone1Scene':
        component = <Zone1 />;
        break;
      case 'ChartZone2Scene':
        component = <Zone2 />;
        break;
      default:
        break;
    }
    return component;
  }
}

export default composeLayout(store, MainLayout);
