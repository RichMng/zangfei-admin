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
                  <el-form-item label="年龄：" prop="age">
                    <span>{{showForm.age}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="生日：" prop="birthday">
                    <span>{{showForm.birthday}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="创建时间：" prop="createdAtValue">
                    <span>{{showForm.createdAtValue}}</span>
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
      </el-tab-pane>

      <el-tab-pane label="取货单信息" name="loadFetchingOrders">
        <el-table :data="showForm.packageBoList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
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
      </el-tab-pane>

      <el-tab-pane label="送货单信息" name="loadDispatchingOrders">
        <el-table :data="showForm.packageBoList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
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
      </el-tab-pane>

      <el-tab-pane label="地址信息" name="loadAddresses">
        <el-table :data="showForm.packageBoList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
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
        packagesList: [
           {
               packageCode: "",
               packagedAtValue: "",
               packagedOperatorId: 1,
               warehousedAtValue: "",
               warehousedOperatorId: 1
           }
        ],
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
      loadUser (id) {
        this.loading = true;
        return User.show(!!id ? { id: id } : this.$route.params).then((response) => {
          this.loading = false;
          if (response.data.code == 200) {
            this.showForm = Object.assign({}, response.data.data);
          } else {
            this.$Message.error({ content: '请求错误' });
          }
        }).catch(() => {
          this.$Message.error({ content: '请求失败' });
        });
      },

      loadGoods (userId) {
        this.loading = true;
        return Goods.list({ userId: userId }).then((response) => {
          this.loading = false;
          this.goodsList = response.data.data

        }).catch(() => {
          this.$Message.error({ content: '请求失败' });
        });
      },

      loadPackages (userId) {
        this.loading = true;
        return Package.list({ userId: userId }).then((response) => {
          this.loading = false;
          console.info(response)
          this.packagesList = response.data.data
          console.info(this.packagesList)
        }).catch(() => {
          this.$Message.error({ content: '请求失败' });
        });
      },

      loadFetchingOrders (userId) {
        this.loading = true;
        return FetchingOrder.list({ userId: userId }).then((response) => {
          this.loading = false;
          this.fetchingOrdersList = response.data.data
        }).catch(() => {
          this.$Message.error({ content: '请求失败' });
        });
      },

      loadDispatchingOrders (userId) {
        this.loading = true;
        return DispatchingOrder.list({ userId: userId }).then((response) => {
          this.loading = false;
          this.dispatchingOrdersList = response.data.data
        }).catch(() => {
          this.$Message.error({ content: '请求失败' });
        });
      },

      loadAddresses (userId) {
        this.loading = true;
        return Address.list({ userId: userId }).then((response) => {
          this.loading = false;
          this.addressesList = response.data.data
        }).catch(() => {
          this.$Message.error({ content: '请求失败' });
        });
      },

      selsChange: function (sels) {
        this.sels = sels;
      },
      handleClick (tab, event) {
        this.$options.methods[tab.name](this.$route.params.id);
      },
    }
  };
</script>
