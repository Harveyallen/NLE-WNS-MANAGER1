import Axios from '@/lib/axios/config';

const $http = {
  // 登录
  login(data) {
    return Axios.post('user/auth', data);
  },
  // 找回密码发送邮件
  forgetPwd(data) {
    return Axios.post('user/forgetPwd', data);
  },
  // 找回密码
  resetPwdEnd(data) {
    return Axios.post('user/resetPwdEnd', data);
  },
  // 用户注册
  register(data) {
    return Axios.post('user/register', data);
  },
  // 用户登出
  logout(data) {
    return Axios.post('user/logout', data);
  },
  // 仓库列表
  warehouse(data) {
    return Axios.get('warehouse', { params: data });
  },
  // 仓库认证
  apply(data) {
    return Axios.put('owner/apply', data);
  },
  // 添加仓库
  warehousePut(data, type) {
    if (type) return Axios.post('warehouse', data);
    return Axios.put('warehouse', data);
  },
  // 单条仓库
  WarehouseInfo(data) {
    return Axios.get(`warehouse/${data}`);
  },
  // 货区列表
  warehouseArea(data) {
    return Axios.get('warehouseArea', { params: data });
  },
  // 添加货区
  addWarehouseArea(data) {
    return Axios.put('warehouseArea', data);
  },
  // 删除货区
  delWarehouseArea(data) {
    return Axios.delete('warehouseArea', { params: data });
  },
  // 单条货区
  getInfoWarehouseArea(data) {
    return Axios.get(`warehouseArea/${data}`);
  },
  // 货架列表
  Warehouseshelf(data) {
    return Axios.get('shelf', { params: data });
  },
  // 添加货架
  addWarehouseshelf(data, edit) {
    if (edit) return Axios.post('shelf', data);
    return Axios.put('shelf', data);
  },
  // 单条货架
  shelfInfo(data) {
    return Axios.get(`shelf/${data}`);
  },
  // 删除货架
  delShelf(data) {
    return Axios.delete('shelf', { params: data });
  },
  // 托盘列表
  tray(data) {
    return Axios.get('tray', { params: data });
  },
  // 添加托盘
  addTray(data, type) {
    if (type) return Axios.post('tray', data);
    return Axios.put('tray', data);
  },
  // 删除托盘
  delTray(data) {
    return Axios.delete('tray', { params: data });
  },
  // 单条托盘
  TrayInfo(data) {
    return Axios.get(`tray/${data}`);
  },
  // 篮子列表
  kep(data) {
    return Axios.get('kep', { params: data });
  },
  // 添加/编辑篮子
  addKep(data, edit) {
    if (edit) return Axios.post('kep', data);
    return Axios.put('kep', data);
  },
  // 删除篮子
  delKep(data) {
    return Axios.delete('kep', { params: data });
  },
  // 入库单分类
  batchType(data) {
    return Axios.get('batchType', { params: data });
  },
  // 修改入库单分类
  editBatchType(data) {
    return Axios.post('batchType', data);
  },
  // 添加入库单分类
  addBatchType(data) {
    return Axios.put('batchType', data);
  },
  // 添加入库单分类
  delBatchType(data) {
    return Axios.delete('batchType', { params: data });
  },
  // 出库列表
  orderType(data) {
    return Axios.get('orderType', { params: data });
  },
  // 删除出库单
  delOrderType(data) {
    return Axios.delete('orderType', { params: data });
  },
  // 修改入库单分类
  editOrderType(data) {
    return Axios.post('orderType', data);
  },
  // 添加出库单
  addOrderType(data) {
    return Axios.put('orderType', data);
  },
  // 商品库列表
  goodsList(data) {
    return Axios.get('product', { params: data });
  },
  // 添加商品
  GoodsAdd(data, type) {
    if (type) return Axios.post('product', data);
    return Axios.put('product', data);
  },
  // 添加规格
  addSpec(data, type) {
    if (type) return Axios.post('spec', data);
    return Axios.put('spec', data);
  },
  // 删除规格
  delSpec(data) {
    return Axios.delete('spec', { params: data });
  },
  // 单条商品信息
  getGoodsInfo(data) {
    return Axios.get(`product/${data}`);
  },
  // 已申请列表
  ownerList(data) {
    return Axios.get('owner', { params: data });
  },
  // 租赁仓库列表
  rentersList(data) {
    return Axios.get('renters', { params: data });
  },
  // 可租赁仓库列表
  check(data) {
    return Axios.post('owner/check', data);
  },
  // 找回密码
  changePwd(data) {
    return Axios.post('user/changePwd', data);
  },
  // 租赁仓库列表
  renterslist(data) {
    return Axios.get('renters/list', { params: data });
  },
  // 租赁仓库认证
  rentersApply(data) {
    return Axios.put('renters/apply', data);
  },
  // 租赁仓库认证詳情
  ownerInfo(data) {
    return Axios.get(`owner/${data}`);
  },
  // 租赁仓库认证详情
  rentersShow(data) {
    return Axios.get(`renters/show/${data}`);
  },
  // 确认租赁
  renters(data) {
    return Axios.put('renters', data);
  },
  // 我的信息
  account() {
    return Axios.get('user/account');
  },
  // 产地列表
  originList() {
    return Axios.get('origin');
  },
  // 添加产地
  originAdd(data, type) {
    if (type) return Axios.post('origin', data);
    return Axios.put('origin', data);
  },
  // 删除产地
  originDel(data) {
    return Axios.delete('origin', { params: data });
  },
  // 分类列表
  categoryList() {
    return Axios.get('category');
  },
  // 入库单列表
  inboundList(data) {
    return Axios.get('batch', { params: data });
  },
  // 入库单添加
  inboundAdd(data) {
    return Axios.put('batch', data);
  },
  // 删除供应商
  distributorDel(data) {
    return Axios.delete('distributor', { params: data });
  },
  // 供应商列表
  distributorList() {
    return Axios.get('distributor');
  },
  // 添加编辑供应商
  distributorAdd(data, edit) {
    if (edit) return Axios.post('distributor', data);
    return Axios.put('distributor', data);
  },
  // 删除入库单
  inboundDel(data) {
    return Axios.delete('batch', { params: data });
  },
  // 入库单详情
  inboundDetail(data) {
    return Axios.get(`batch/${data}`);
  },
  // 出库单列表
  outboundList(data) {
    return Axios.get('order', { params: data });
  },
  // 拉取库存报警
  inventoryWarn() {
    return Axios.get('warning/stock');
  },
  // 编辑库存报警
  stockWarningAdd(data) {
    return Axios.post('warning/stock', data);
  },
  // 拉取保质期报警
  expirationWarn() {
    return Axios.get('warning/expiration');
  },
  // 编辑保质期报警
  expirationWarningAdd(data) {
    return Axios.post('warning/expiration', data);
  },
};

export default $http;
