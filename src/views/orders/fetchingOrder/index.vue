<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="fetchingOrders" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="userBo.name" label="姓名" width="150" sortable>
      </el-table-column>
      <el-table-column prop="fetchingType" label="类型" width="100" sortable>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100" sortable>
      </el-table-column>
      <el-table-column prop="way" label="取货方式" width="150" sortable>
      </el-table-column>
      <el-table-column prop="customerRemark" label="顾客备注" width="200" sortable>
      </el-table-column>
      <el-table-column prop="userBo.createdAtValue" label="创建时间" width="200" sortable>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template scope="scope">
          <!-- <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button size="small" @click="show(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.gender">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birthday"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import util from '@/common/js/util';
  import FetchingOrder from '@/models/orders/fetchingOrder';

  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        fetchingOrders: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列

        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          gender: -1,
          age: 0,
          birthday: '',
          addr: ''
        },

        addLoading: false,
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      //获取取货单列表
      getList() {
        let para = {
          page: this.page,
          name: this.filters.name
        };
        this.listLoading = true;
        // NProgress.start();
        FetchingOrder.list(para).then((res) => {
          this.total = res.data.data.total;
          this.fetchingOrders = res.data.data.resultList;
          this.listLoading = false;
          // NProgress.done();
        }).catch(() => {
          this.listLoading = false;

        });
      },
      //显示编辑界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      show: function (index, row){
        this.$router.push({
            path: '/fetching/' + row.id,
            params: {
                id: row.id,
            }
        });
      },
      //编辑
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para.birthday = (!para.birthday || para.birthday == '') ? '' : util.formatDate.format(new Date(para.birthday), 'yyyy-MM-dd');
              FetchingOrder.update(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getList();
              });
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
    },
    mounted() {
      this.getList();
    }
  }

</script>

<style scoped>

</style>
