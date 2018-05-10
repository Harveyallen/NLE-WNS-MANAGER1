import addComponent from './addComponent';

const navTop = require('@/page/NavMenu/top.vue');
const navSide = require('@/page/NavMenu/side');

const LayoutTop = r => require.ensure([], () => r(navTop), 'LayoutTop');
const LayoutSide = r => require.ensure([], () => r(navSide), 'LayoutSide');

export const routerMap = [
  {
    component: LayoutTop,
    redirect: 'myWms/home',
    path: '/',
    children: [
      {
        name: 'myWms',
        path: 'myWms',
        component: LayoutSide,
        redirect: 'myWms/home',
        icon: '&#xe641;',
        nav: 1,
        children: [
          {
            path: 'home',
            name: 'home',
            nav: 2,
          },
          {
            path: 'myAuthentication',
            name: 'myAuthentication',
            nav: 2,
          },
          {
            path: 'myAuthentication/addAuthentication',
            name: 'authenticationForm',
            nav: 0,
          },
          {
            path: 'myAuthentication/add_apply',
            name: 'addApply',
            nav: 0,
          },
          {
            path: 'homeSetup',
            name: 'homeSetup',
            nav: 2,
          },
          {
            path: 'editPassword',
            name: 'editPassword',
            nav: 2,
          },
        ],
      },
      {
        name: 'newStore',
        path: 'newStore',
        icon: '&#xe600;',
        component: LayoutSide,
        redirect: 'newStore/storeManage',
        nav: 1,
        children: [
          {
            name: 'storeManage',
            path: 'storeManage',
            nav: 2,
          },
          {
            name: 'BasicsConfig',
            path: 'storeManage/BasicsConfig',
            nav: 0,
          },
          {
            name: 'addCargoShelf',
            path: 'storeManage/addCargoShelf',
            nav: 0,
          },
          {
            name: 'addCargoKep',
            path: 'storeManage/addCargoKep',
            nav: 0,
          },
          {
            name: 'addCargoArea',
            path: 'storeManage/addCargoArea',
            nav: 0,
          },
          {
            name: 'addCargoTray',
            path: 'storeManage/addCargoTray',
            nav: 0,
          },
          {
            name: 'addBatchType',
            path: 'storeManage/addBatchType',
            nav: 0,
          },
          {
            name: 'addOrderType',
            path: 'storeManage/addOrderType',
            nav: 0,
          },
          {
            name: 'addStoreManage',
            path: 'storeManage/addStoreManage',
            nav: 0,
          },
          {
            name: 'seeApplication',
            path: 'seeApplication',
            nav: 2,
          },
        ],
      },
      {
        name: 'StoreLease',
        path: 'StoreLease',
        icon: '&#xe88d;',
        component: LayoutSide,
        redirect: 'StoreLease/StoreLeases',
        nav: 1,
        children: [
          {
            name: 'StoreLeases',
            path: 'StoreLeases',
            nav: 2,
          },
          {
            name: 'MayApplyStore',
            path: 'MayApplyStore',
            nav: 2,
          },
          {
            name: 'MayApplyStoreInfo',
            path: 'MayApplyStore/MayApplyStoreInfo',
            nav: 0,
          },
          {
            name: 'LeaseAudit',
            path: 'MayApplyStore/LeaseAudit',
            nav: 0,
          },
        ],
      },
      {
        name: 'commodityManage',
        path: 'commodityManage',
        component: LayoutSide,
        redirect: 'commodityManage/MyGoodsList',
        icon: '&#xe625;',
        nav: 1,
        children: [
          {
            name: 'MyGoodsList',
            path: 'MyGoodsList',
            nav: 2,
          },
          {
            name: 'goodsAddEdit',
            path: 'MyGoodsList/goodsAddEdit',
            nav: 0,
          },
          {
            name: 'inventoryManage',
            path: 'inventoryManage',
            nav: 2,
          },
          {
            name: 'goodsAlarm',
            path: 'goodsAlarm',
            nav: 2,
          },
          {
            name: 'inboundList',
            path: 'inboundList',
            nav: 2,
          },
          {
            name: 'addInbound',
            path: 'inboundList/addInbound',
            nav: 0,
          },
          {
            name: 'outboundList',
            path: 'outboundList',
            nav: 2,
          },
          {
            name: 'logisticsQuery',
            path: 'logisticsQuery',
            nav: 2,
          },
        ],
      },
      {
        name: 'staffManage',
        path: 'staffManage',
        component: LayoutSide,
        redirect: 'staffManage/staffList',
        icon: '&#xe67f;',
        nav: 1,
        children: [
          {
            name: 'staffList',
            path: 'staffList',
            nav: 2,
          },
          {
            name: 'staffAdd',
            path: 'staffList/staffAdd',
            nav: 0,
          },
          {
            name: 'staffGroupList',
            path: 'staffGroupList',
            nav: 2,
          },
          {
            name: 'staffGroupAdd',
            path: 'staffGroupList/staffGroupAdd',
            nav: 0,
          },
        ],
      },
    ],
  },
];
addComponent(routerMap);
export const homeRoute = [
  {
    component: LayoutTop,
    redirect: 'myWms/home',
    path: '/',
    children: [],
  },
  {
    name: 'login',
    path: '/login',
  },
  {
    name: 'register',
    path: '/register',
  },
  {
    name: 'backPassword',
    path: '/backPassword',
  },
];

addComponent(homeRoute);
