<template>
  <div class="brands-edit">
    <Card>
      <p slot="title"> {{ brand.brandId && brand.brandName || '新建品牌' }} </p>
      <Row>
        <Col span="12">
          <Form ref="brands-edit" :model="brand" :label-width="100" :rules="rules">
            <FormItem label="ID" v-if="brand.brandId">
              {{ brand.brandId }}
            </FormItem>
            <FormItem label="名称" prop="brandName">
              <Input v-model="brand.brandName"></Input>
            </FormItem>
            <FormItem label="英文名称">
              <Input v-model="brand.brandNameEn"></Input>
            </FormItem>
            <FormItem label="Logo">
              <compose-upload type='small' :before-upload='beforeUpload' :images='brandLogos' :uploading='brandUploading' @view='viewLogo' @remove='removeLogo'>
              </compose-upload>
              <Modal title="查看图片" v-model="brandVisible" width="80">
                <img :src="brandImage" style="width: 100%">
              </Modal>
            </FormItem>
            <FormItem label="介绍">
              <Input v-model="brand.introduce" type="textarea"></Input>
            </FormItem>
            <FormItem label="状态" v-if="brand.brandSpu">
              {{ brand.state }}
            </FormItem>
            <FormItem label="创建时间" v-if="brand.brandSpu">
              {{ brand.createTime }}
            </FormItem>
            <FormItem>
              <Button type="primary" @click="submit('brands-edit')">提交</Button>
              <Button type="ghost" style="margin-left: 8px" @click="cancel">取消</Button>
            </FormItem>
            <Spin size="large" fix v-if="loading"></Spin>
          </Form>
        </Col>
      </Row>
    </Card>
  </div>
</template>

<script>
  // import helper from '@/libs/helper';
  // import ShopBrand from '@/models/shop/brand';
  // import composeUpload from '@/views/components/compose-upload/compose-upload.vue';

  export default {
    components: {
      composeUpload
    },
    name: 'brands-edit',
    data () {
      return {
        loading: false,
        brand: { brandId: null, brandName: null, brandNameEn: null, brandLogo: null, introduce: null, state: null, createTime: null },
        brandUploading: false,
        brandVisible: false,
        brandImage: '',
        rules: {
          brandName: [
            { required: true, trigger: "blur" }
          ]
        },
        brandLogos: []
      }
    },
    created () {
      if (this.$route.params.brandId) this.load();
    },
    computed: {
      brandLogo () {
        return helper.imageUrl + this.brand.brandLogo
      }
    },
    watch: {
      '$route': 'load'
    },
    methods: {
      load () {
        this.loading = true
        Promise.all([
          this.loadBrand()
        ]).catch( error => {
          this.$Message.error({ content: '网络错误' });
        }).finally(() => {
          this.loading = false;
        });
      },
      loadBrand () {
        return ShopBrand.show(this.$route.params).then((response) => {
          if (response.data.code == 200) {
            this.brand = response.data.data;
            this.brandLogos.push(helper.imageUrl + this.brand.brandLogo)
          } else {
            this.$Message.error({ content: '请求错误' });
          }
        }).catch(() =>{
          this.$Message.error({ content: '请求失败' });
        });
      },
      submit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            (this.brand.brandId ? ShopBrand.update(this.brand) : ShopBrand.create(this.brand)).then((response) => {
              if (response.data.code == 200) {
                this.brand.brandId ? this.$router.push({ name: "brands_show", params: { brandId: this.brand.brandId } }) :
                this.$router.push({ name: "brands" })
              } else {
                console.log(respose.status);
              }
            }).catch( error => {
              this.$Message.error({ content: '提交失败' });
              console.log(error);
            });
          }
        })
      },
      cancel () {
        this.$router.go(-1);
      },
      beforeUpload (file, id) {
        this.brandUploading = true;
        helper.oss.multipartUpload(`${helper.uuid(`brands-${(new Date()).getTime()}`)}.${helper.fileExtension(file.name)}`, file).then((response) => {
          if (response.res.status == 200) {
            this.brand.brandLogo = response.name
            this.brandLogos.push(helper.imageUrl + this.brand.brandLogo)
          } else {
            this.$Message.error({ content: '上传失败' });
          }
        }).catch(() => {
          this.$Message.error({ content: '上传错误' });
        }).finally(() => {
          this.brandUploading = false;
        })
        return false;
      },
      viewLogo (image) {
        this.brandImage = image;
        this.brandVisible = true;
      },
      removeLogo (image) {
        this.brandLogos = _.without(this.brandLogos, image);
      }
    }
  };
</script>
