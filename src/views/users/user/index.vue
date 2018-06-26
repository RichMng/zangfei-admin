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
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="50">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="150" sortable>
      </el-table-column>
      <el-table-column prop="mobile" label="手机" width="150" sortable>
      </el-table-column>
      <el-table-column prop="gender" label="性别" width="90" :formatter="formatGender" sortable>
      </el-table-column>
      <el-table-column prop="birthday" label="生日" width="150" sortable>
      </el-table-column>
      <el-table-column prop="createdAtValue" label="创建时间" width="200" sortable>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" @click="show(scope.$index, scope.row)">查看</el-button>
          <el-button size="small" @click="createFetchingOrder(scope.$index, scope.row)">新建取货单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
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
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birthday"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面-->
    <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="addForm.gender">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birthday"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr" >
          <v-region :town="true" @values="regionChange" class="form-control"></v-region>
          <el-input v-model="addForm.addr" auto-complete="off" placeholder="请输入门牌号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--show界面-->
    <el-dialog title="" v-model="showFormVisible" :close-on-click-modal="false">
      <el-form :model="showForm" label-width="80px" ref="showForm">
        <el-card shadow="hover" class="20px Extra large ">
            {{showForm.name}} {{showForm.gender}}
        </el-card>
        <el-form-item label="性别">
          <el-radio-group v-model="showForm.gender">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="showForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="showForm.birthday"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="showFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import util from '@/common/js/util';
  import User from '@/models/users/user';

  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        users: [],
        total: 0,
        page: 1,
        listLoading: false,
        sels: [],//列表选中列
        // genderList: genderList,
        editFormVisible: false,//编辑界面是否显示
        editLoading: false,
        showFormVisible: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          gender: '',
          age: 0,
          birthday: '',
          addr: ''
        },

        addFormVisible: false,//新增界面是否显示
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          addr: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
        },
        //新增界面数据
        addForm: {
          name: '',
          gender: '',
          age: 0,
          birthday: '',
          addr: ''
        },
        showForm: {
          name: '',
          gender: '',
          age: 0,
          birthday: '',
          addr: ''
        }

      }
    },
    methods: {
      //性别显示转换
      formatGender: function (row, column) {
        return row.gender == 1 ? '男' : row.gender == 0 ? '女' : '未知';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getList();
      },
      //获取用户列表
      getList() {
        let para = {
          page: this.page,
          name: this.filters.name
        };
        debugger
        this.listLoading = true;
        // NProgress.start();
        User.list(para).then((res) => {
          this.total = res.data.data.total;
          this.users = res.data.data.resultList;
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
      //显示新增界面
      handleAdd: function () {
        this.addFormVisible = true;
        this.addForm = {
          name: '',
          gender: -1,
          age: 0,
          birthday: '',
          addr: ''
        };
      },
      show: function (index, row){
        this.$router.push({
            path: '/user/' + row.id,
            params: {
                id: row.id,
            }
        });
      },
      createFetchingOrder: function (index, row){
        this.$router.push({
            name: "fetching_new",
            params: {
                userId: row.id,
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
              User.update(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getList();
              }).catch(() => {
                this.editLoading = false;
                this.$message({
                  message: '提交失败',
                  type: 'error'
                });
              });
            });
          }
        });
      },
      //新增
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
              para.birthday = (!para.birthday || para.birthday == '') ? '' : util.formatDate.format(new Date(para.birthday), 'yyyy-MM-dd');
              User.create(para).then((res) => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['addForm'].resetFields();
                this.addFormVisible = false;
                this.getList();
              }).catch(() => {
                this.addLoading = false;
                this.$message({
                  message: '提交失败',
                  type: 'error'
                });
              });
            });
          }
        });
      },
      selsChange: function (sels) {
        this.sels = sels;
      },
      //批量删除
      batchRemove: function () {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = { ids: ids };
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getList();
          });
        }).catch(() => {

        });
      },
      regionChange(data){
        console.log(data);
      }
    },
    mounted() {
      this.getList();
    }
  }

</script>
