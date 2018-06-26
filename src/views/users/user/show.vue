<style scoped>
  .fetching-show {
    margin-top: 20px;
  }
</style>

<template>
  <div class="fetching-show" :model="showForm" ref="showForm" v-loading="loading">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="loadUser">
        <el-card class="box-card">
          <el-form>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="姓名：" prop="name">
                    <span>{{showForm.name}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="电话：" prop="mobile">
                    <span>{{showForm.mobile}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="性别：" prop="gender">
                    <span>{{showForm.gender}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="生日：" prop="birthday">
                    <span>{{showForm.birthday}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="创建时间：" prop="birthday">
                    <span>{{showForm.createdAtValue}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="更新时间：" prop="createdAtValue">
                    <span>{{showForm.updatedAtValue}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="商品信息" name="loadGoods">
        <el-table :data="goodsList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="goodsCode" label="商品编码" width="150" sortable>
          </el-table-column>
          <el-table-column prop="status" label="状态" width="150" sortable>
          </el-table-column>
          <el-table-column prop="accessory" label="配件" min-width="150" sortable>
          </el-table-column>
          <el-table-column prop="createdAtValue" label="创建时间" width="200" sortable>
          </el-table-column>
          <el-table-column prop="updatedAtValue" label="更新时间" width="200" sortable>
          </el-table-column>
        </el-table>
        <!-- <el-col :span="24" class="toolbar">
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
          </el-pagination>
        </el-col> -->
      </el-tab-pane>

      <el-tab-pane label="包裹信息" name="loadPackages">
        <el-table :data="packagesList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="packageCode" label="包裹编码" width="150" sortable>
          </el-table-column>
          <el-table-column prop="packagedAtValue" label="打包时间" width="200" sortable>
          </el-table-column>
          <el-table-column prop="packagedOperator.name" label="打包人" width="200" sortable>
          </el-table-column>
          <el-table-column prop="warehousedAtValue" label="入库时间" width="200" sortable>
          </el-table-column>
          <el-table-column prop="warehousedOperator.name" label="入库人" min-width="200" sortable>
          </el-table-column>
        </el-table>
        <!-- <el-col :span="24" class="toolbar">
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
          </el-pagination>
        </el-col> -->
      </el-tab-pane>

      <el-tab-pane label="取货单信息" name="loadFetchingOrders">
        <el-table :data="fetchingOrdersList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100" sortable>
          </el-table-column>
          <el-table-column prop="fetchingType" label="类型" width="150" sortable>
          </el-table-column>
          <el-table-column prop="way" label="方式" width="150" sortable>
          </el-table-column>
          <el-table-column prop="customerRemark" label="顾客备注" min-width="200" sortable>
          </el-table-column>
          <el-table-column prop="createdAtValue" label="创建时间" min-width="80" sortable>
          </el-table-column>
          <el-table-column prop="assignedAtValue" label="领取时间" min-width="80" sortable>
          </el-table-column>
          <el-table-column prop="departedAtValue" label="出发时间" min-width="80" sortable>
          </el-table-column>
          <el-table-column prop="receivedAtValue" label="接收时间" min-width="80" sortable>
          </el-table-column>
          <el-table-column prop="warehousedAtValue" label="入库时间" min-width="80" sortable>
          </el-table-column>
        </el-table>
        <!-- <el-col :span="24" class="toolbar">
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
          </el-pagination>
        </el-col> -->
      </el-tab-pane>

      <el-tab-pane label="送货单信息" name="loadDispatchingOrders">
        <el-table :data="dispatchingOrdersList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="status" label="状态" width="100" sortable>
          </el-table-column>
          <el-table-column prop="way" label="方式" width="150" sortable>
          </el-table-column>
          <el-table-column prop="customerRemark" label="顾客备注" min-width="200" sortable>
          </el-table-column>
          <el-table-column prop="createdAtValue" label="创建时间" min-width="80" sortable>
          </el-table-column>
          <el-table-column prop="assignedAtValue" label="领取时间" min-width="80" sortable>
          </el-table-column>
          <el-table-column prop="deliveriedAtValue" label="出库时间" min-width="80" sortable>
          </el-table-column>
          <el-table-column prop="departedAtValue" label="出发时间" min-width="80" sortable>
          </el-table-column>
          <el-table-column prop="completedAtValue" label="完成时间" min-width="80" sortable>
          </el-table-column>
        </el-table>
        <!-- <el-col :span="24" class="toolbar">
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
          </el-pagination>
        </el-col> -->
      </el-tab-pane>

      <el-tab-pane label="地址信息" name="loadAddresses">
        <el-table :data="addressesList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="150" sortable>
          </el-table-column>
          <el-table-column prop="mobile" label="电话" width="150" sortable>
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="100" :formatter="formatGender" sortable>
          </el-table-column>
          <el-table-column prop="provinceBo.name" label="省份" width="100" sortable>
          </el-table-column>
          <el-table-column prop="cityBo.name" label="城市" width="100" sortable>
          </el-table-column>
          <el-table-column prop="areaBo.name" label="区县" width="100" sortable>
          </el-table-column>
          <el-table-column prop="streetBo.name" label="街道" width="200" sortable>
          </el-table-column>
          <el-table-column prop="detail" label="详细地址" min-width="200" sortable>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import util from '@/common/js/util';
  import User from '@/models/users/user';
  import Goods from '@/models/orders/goods';
  import Address from '@/models/tms/address';
  import FetchingOrder from '@/models/orders/fetchingOrder';
  import DispatchingOrder from '@/models/orders/dispatchingOrder';
  import Package from '@/models/orders/package';

  export default {
    data () {
      return {
        goodsList: [],
        packagesList: [],
        fetchingOrdersList: [],
        dispatchingOrdersList: [],
        addressesList: [],
        loading: false,
        activeName: 'loadUser',
        //查看页面数据
        showForm: {
           assignedAtValue: '',
           assignedOperator: {
               name: '',
           },
           attachmentBoList:[
                {
                  attachmentCode:"",
                  attachmentNames:"",
                },
              ],
           createdAtValue: '',
           createdOperator: {
               name: '',
           },
           customerRemark: '',
           departedAtValue: '',
           departedOperator: {
               name: '',
           },
           fetchingType: '',
           packageBoList: [
               {
                   packageCode: "",
                   packagedAtValue: "",
                   packagedOperatorId: 1,
                   warehousedAtValue: "",
                   warehousedOperatorId: 1
               }
           ],
           receivedAtValue: '',
           receivedOperator: {
               name: '',
           },
           status: '',
           userBo: {
               createdAtValue: '',
               mobile: '',
               name: '',
           },
           warehousedAtValue: '',
           warehousedOperator: {
               name: '',
           },
           way: '',
        },
      }
    },
    created () {
      this.loadUser();
    },
    watch: {
      '$route': 'load'
    },

    methods: {
      formatGender: function (row, column) {
        return row.gender == 1 ? '男' : row.gender == 0 ? '女' : '未知';
      },
      loadUser (id, _this) {
        _this = !!id ? _this : this
        _this.loading = true;
        return User.show(!!id ? { id: id } : _this.$route.params).then((response) => {
          _this.loading = false;
          if (response.data.code == 200) {
            _this.showForm = Object.assign({}, response.data.data);
          } else {
            _this.$message({ message: '请求错误', type: 'error' });
          }
        }).catch(() => {
          _this.$message({
            message: '提交失败',
            type: 'error'
          });
        });
      },

      loadGoods (userId, _this) {
        _this.loading = true;
        return Goods.list({ userId: userId }).then((response) => {
          _this.loading = false;
          _this.goodsList = response.data.data.resultList
        }).catch(() => {
          _this.$message({ message: '请求失败', type: 'error' });
        });
      },

      loadPackages (userId, _this) {
        _this.loading = true;
        return Package.list({ userId: userId }).then((response) => {
          _this.loading = false;
          _this.packagesList = response.data.data
        }).catch(() => {
          _this.$message({ message: '请求失败', type: 'error' });
        });
      },

      loadFetchingOrders (userId, _this) {
        _this.loading = true;
        return FetchingOrder.list({ userId: userId }).then((response) => {
          _this.loading = false;
          _this.fetchingOrdersList = response.data.data.resultList
        }).catch(() => {
          _this.$message({ message: '请求失败', type: 'error' });
        });
      },

      loadDispatchingOrders (userId, _this) {
        _this.loading = true;
        return DispatchingOrder.list({ userId: userId }).then((response) => {
          _this.loading = false;
          _this.dispatchingOrdersList = response.data.data.resultList
        }).catch(() => {
          _this.$message({ message: '请求失败', type: 'error' });
        });
      },

      loadAddresses (userId, _this) {
        _this.loading = true;
        return Address.list({ userId: userId }).then((response) => {
          _this.loading = false;
          _this.addressesList = response.data.data
        }).catch(() => {
          _this.$message({ message: '请求失败', type: 'error' });
        });
      },

      selsChange: function (sels) {
        this.sels = sels;
      },

      handleClick (tab, event) {
        this.$options.methods[tab.name](this.$route.params.id, this);
      },
    }
  };
</script>
