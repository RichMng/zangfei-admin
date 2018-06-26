import Login from './views/Login.vue';
import NotFound from './views/404.vue';
import Home from './views/Home.vue';
import Main from './views/Main.vue';
import Table from './views/nav1/Table.vue';
import Form from './views/nav1/Form.vue';
import Page4 from './views/nav2/Page4.vue';
import Page5 from './views/nav2/Page5.vue';
import Page6 from './views/nav3/Page6.vue';
import echarts from './views/charts/echarts.vue';


let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    // { path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '订单',
        iconCls: 'el-icon-message', //图标样式class
        children: [
            {
                path: '/fetching',
                name: '取货单列表',
                title: '取货单',
                meta: { menu: true },
                component: resolve => { require(['@/views/orders/fetchingOrder/index.vue'], resolve); },
            },
            {
              path: 'fetching/new',
              name: 'fetching_new',
              title: '新建取货单',
              meta: { action: 'fetching' },
              hidden: true,
              component: resolve => { require(['@/views/orders/fetchingOrder/new.vue'], resolve); }
            },
            {
              path: 'fetching/:id',
              name: '取货单详情',
              title: '查看取货单',
              meta: { action: 'fetching' },
              hidden: true,
              component: resolve => { require(['@/views/orders/fetchingOrder/show.vue'], resolve); }
            },
            {
              path: 'fetching/:fetchingId/edit',
              name: 'fetching_edit',
              title: '编辑取货单',
              meta: { action: 'fetching' },
              hidden: true,
              component: resolve => { require(['@/views/orders/fetchingOrder/edit.vue'], resolve); }
            },
            {
              path: '/dispatching',
              name: '送货单列表',
              title: '送货单',
              meta: { action: 'dispatching' },
              component: resolve => { require(['@/views/orders/dispatchingOrder/index.vue'], resolve); }
            },
            {
              path: 'dispatching/:id',
              name: '送货单详情',
              title: '查看送货单',
              meta: { action: 'dispatching' },
              hidden: true,
              component: resolve => { require(['@/views/orders/dispatchingOrder/show.vue'], resolve); }
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户',
        iconCls: 'el-icon-message',
        children: [
            {
                path: '/user',
                name: '用户列表',
                title: '用户',
                meta: { menu: true },
                component: resolve => { require(['@/views/users/user/index.vue'], resolve); },
            },
            {
              path: 'user/:id',
              name: '用户详情',
              title: '用户详情',
              meta: { action: 'user' },
              hidden: true,
              component: resolve => { require(['@/views/users/user/show.vue'], resolve); }
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message', //图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            // { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true, //只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
