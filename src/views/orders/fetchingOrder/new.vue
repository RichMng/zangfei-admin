<template>
  <div class="fetching-new">
    <el-card>
      <p slot="title"> {{ '新建取货单' }} </p>
      <el-row>
        <p>取货单信息</p>
        <el-col :span="5">
          <el-form label-width="100">
            <el-form-item label="用户姓名" v-if="user.name">
              {{ user.name }}
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="5">
          <el-form label-width="100">
            <el-form-item label="地址" prop="addressesList">
              <el-select v-model="fetchingOrder.addressId" filterable>
                <el-option v-for="item in addressesList" :value="item.id" :key="item.id">{{ item.addressStr }}</el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="5">
          <el-form label-width="80">
            <el-form-item label="类型" prop="fetchingType">
              <el-select v-model="fetchingOrder.fetchingType" filterable >
                <el-option v-for="item in fetchingTypesList" :value="item.value" :key="item.key">{{ item.value }}</el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="5">
          <el-form label-width="80">
            <el-form-item label="方式" prop="way">
              <el-select v-model="fetchingOrder.way" filterable >
                <el-option v-for="item in fetchingWayList" :value="item.value" :key="item.key">{{ item.value }}</el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-form-item label="顾客备注">
            <el-input v-model="fetchingOrder.customerRemark" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form label-width="100">
            <el-form-item>
              <el-button type="primary" @click="submit()">提交</el-button>
              <el-button type="ghost" style="margin-left: 8px" @click="cancel">取消</el-button>
            </el-form-item>
            <!-- <Spin size="large" fix v-if="loading"></Spin> -->
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import util from '@/common/js/util';
  import FetchingOrder from '@/models/orders/fetchingOrder';
  import User from '@/models/users/user';
  import Address from '@/models/tms/address';

  export default {
    data () {
      return {
        userId: null,
        loading: false,
        user: {},
        addressesList: [],
        fetchingTypesList: [
          { key: 10, value: '正常单' },
          { key: 20, value: '返工单' },
        ],
        fetchingWayList: [
          { key: 10, value: 'Zang飞上门取' },
          { key: 20, value: '顾客送到店' },
        ],
        fetchingOrder: {
          customerRemark: "",
          fetchingType: "",
          storeId: 1,
          userId: null,
          addressId: null,
          addressSnapshot: '',
          way: ""
        },
      }
    },
    created () {
      this.userId = this.$route.params.userId;
      this.load();
    },
    watch: {
      '$route': 'load'
    },
    methods: {
      load () {
        this.loading = true
        Promise.all([
          this.loadUser(),
          this.loadAddresses(),
        ]).finally(() => {
          this.loading = false;
        });
      },
      loadUser () {
        return User.show({id: this.userId}).then((response) => {
          if (response.data.code == 200) {
            this.user = response.data.data;
          } else {
            this.$Message.error({ content: '请求错误' });
          }
        })
      },
      loadAddresses () {
        return Address.list({ userId: this.userId }).then((response) => {
          if (response.data.code == 200) {
            this.addressesList = response.data.data;
          } else {
            this.$Message.error({ content: '请求错误' });
          }
        })
      },
      submit () {
        FetchingOrder.create(this.fetchingOrder).then((response) => {
          console.log(response);
          if (response.data.code == 200) {
            // this.goods.goodsId ? this.$router.push({ name: "goods_show", params: { productSku: this.goods.productSku } }) :
            // this.$router.push({ name: "goods" })
          } else {
            this.$Message.error({ content: '请求错误' });
          }
        })
      },
      cancel () {
        // this.goodsvisible = false;
      },
      // viewGoods (name) {
      //   this.goods.goodsDetial = helper.imageUrl + name;
      //   this.goodsvisible = true;
      // },
    }
  };
</script>
<style media="screen">
  .selecttable tr{
    text-align: center;
  }
  .smallimg{
    width: 58px;
    height: 58px;
  }
</style>
