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
                  <el-form-item label="创建人员：" prop="createdAtValue">
                    <span>{{showForm.createdOperator.name}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="创建时间：" prop="createdOperator">
                    <span>{{showForm.userBo.createdAtValue}}</span>
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
                  <el-form-item label="领取时间：" prop="assignedAtValue">
                    <span>{{showForm.assignedAtValue}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="出库人员：" prop="deliveriedOperator">
                    <span>{{showForm.deliveriedOperator.name}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="出库时间：" prop="deliveriedAtValue">
                    <span>{{showForm.deliveriedAtValue}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="出发人员：" prop="departedOperator">
                    <span>{{showForm.departedOperator.name}}</span>
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
                  <el-form-item label="完成人员：" prop="completedOperator">
                    <span>{{showForm.completedOperator.name}}</span>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content">
                  <el-form-item label="完成时间：" prop="completedAtValue">
                    <span>{{showForm.completedAtValue}}</span>
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import util from '@/common/js/util';
  import DispatchingOrder from '@/models/orders/dispatchingOrder';

  export default {
    data () {
      return {
        loading: false,
        //查看页面数据
        showForm: {
          assignedAtValue: "",
          assignedOperator: {
              name: ""
          },
          completedAtValue: "",
          completedOperator: {
              name: ""
          },
          createdAtValue: "",
          createdOperator: {
              name: "",
          },
          customerRemark: "",
          deliveriedAtValue: "",
          deliveriedOperator: {
              name: "",
          },
          departedAtValue: "",
          departedOperator: {
              name: "",
          },
          status: "",
          userBo: {
              mobile: "",
              name: "",
          },
          way: ""
        },
      }
    },
    created () {
      this.Dispatchingload();
    },
    watch: {
      '$route': 'load'
    },
    methods: {
      Dispatchingload () {
        this.loading = true;
        return DispatchingOrder.show(this.$route.params).then((response) => {
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
