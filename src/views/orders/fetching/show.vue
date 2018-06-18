<style scoped>
  .fetching-show {
    margin-top: 20px;
  }
</style>

<template>
  <div class="fetching-show" :model="showForm" ref="showForm" v-loading="loading">
    <el-tabs>
      <el-tab-pane label="基本信息">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{showForm.userBo.name}}（{{showForm.userBo.mobile}}）</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <el-form>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="状态：" prop="status">
                    <span>{{showForm.status}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="类型：" prop="fetchingType">
                    <span>{{showForm.fetchingType}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="取货方式：" prop="way">
                    <span>{{showForm.way}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="顾客备注：" prop="customerRemark">
                    <span>{{showForm.customerRemark}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="创建时间：" prop="createdAtValue">
                    <span>{{showForm.userBo.createdAtValue}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="领取时间：" prop="assignedAtValue">
                    <span>{{showForm.assignedAtValue}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="上门人员：" prop="assignedOperator">
                    <span>{{showForm.assignedOperator.name}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="出发时间：" prop="departedAtValue">
                    <span>{{showForm.departedAtValue}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="入库人员：" prop="warehousedOperator">
                    <span>{{showForm.warehousedOperator.name}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="入库时间：" prop="warehousedAtValue">
                    <span>{{showForm.warehousedAtValue}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="包裹信息">
        <!--列表-->
        <el-table :data="showForm.packageBoList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
          <el-table-column type="index" width="50">
          </el-table-column>
          <el-table-column prop="packageCode" label="包裹编码" width="150" sortable>
          </el-table-column>
          <el-table-column prop="packagedAtValue" label="打包时间" width="200" sortable>
          </el-table-column>
          <el-table-column prop="packagedOperatorId" label="打包人" width="200" sortable>
          </el-table-column>
          <el-table-column prop="warehousedAtValue" label="入库时间" width="200" sortable>
          </el-table-column>
          <el-table-column prop="warehousedOperatorId" label="入库人" min-width="200" sortable>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import util from '@/common/js/util';
  import FetchingOrder from '@/models/orders/fetchingOrder';

  export default {
    data () {
      return {
        loading: false,
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
                  status:10
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
      this.loadFetching();
    },
    watch: {
      '$route': 'load'
    },
    methods: {
      loadFetching () {
        this.loading = true;
        return FetchingOrder.show(this.$route.params).then((response) => {
          this.loading = false;
          if (response.data.code == 200) {
            console.info("###########################################################")
            console.info(response)
            console.info("###########################################################")
            this.showForm = Object.assign({}, response.data.data);
          } else {
            this.$Message.error({ content: '请求错误' });
          }
        }).catch(() => {
          this.$Message.error({ content: '请求失败' });
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
    }
  };
</script>
