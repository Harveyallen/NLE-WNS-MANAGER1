<template>
<div class="goods_edit">
  <mdoel-form
  :colValue="20">
      <el-form slot="left" label-width="120px">
        <label :class="$style.label"> 基本信息 </label>
        <el-form-item label="所属分类">
          <el-select size="small" v-model="form.category_id">
            <el-option
              v-for="item in typeList"
              :label="item.name_cn"
              :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手持端输入">
          <el-tag>我是测试</el-tag>
          <el-tag>不要信我</el-tag>
          <el-tag>保质期</el-tag>
          <el-tag>批次号</el-tag>
        </el-form-item>
        <el-form-item label="中文名称">
          <el-input v-model="form.name_cn" size="small"></el-input>
        </el-form-item>
        <el-form-item label="英文名称">
          <el-input v-model="form.name_en" size="small"></el-input>
        </el-form-item>
        <label :class="$style.label"> 商品规格 </label>
        <el-form-item>
          <el-table
            :data="skuList"
            border >
              <el-table-column label="规格中文名">
                <template slot-scope="scope">
                  <el-input
                  v-if="scope.row.$_edit"
                  size="mini"
                  v-model="scope.row.name_cn"></el-input>
                  <span v-else>{{scope.row.name_cn}}</span>
                </template>
              </el-table-column>
              <el-table-column label="规格英文名">
                <template slot-scope="scope">
                  <el-input
                  v-if="scope.row.$_edit"
                  size="mini"
                  v-model="scope.row.name_en"></el-input>
                  <span v-else>{{scope.row.name_en}}</span>
                </template>
              </el-table-column>
              <el-table-column label="外部编码">
                <template slot-scope="scope">
                  <el-input
                  v-if="scope.row.$_edit"
                  size="mini"
                  v-model="scope.row.relevance_code"></el-input>
                  <span v-else>{{scope.row.relevance_code}}</span>
                </template>
              </el-table-column>
              <el-table-column label="净重(g)" width="150px;">
                <template slot-scope="scope">
                  <el-input-number
                  size="mini"
                  v-if="scope.row.$_edit"
                  :min="0"
                  v-model="scope.row.net_weight"></el-input-number>
                  <span v-else>{{scope.row.net_weight}}</span>
                </template>
              </el-table-column>
              <el-table-column label="毛重(g)" width="150px;">
                <template slot-scope="scope">
                  <el-input-number
                  size="mini"
                  v-if="scope.row.$_edit"
                  :min="0"
                  v-model="scope.row.gross_weight"></el-input-number>
                  <span v-else>{{scope.row.gross_weight}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <template v-if="skuList.length === (scope.$index + 1) || scope.row.$_edit">
                    <el-button size="mini"
                    @click="saveSpec(scope.row, scope.$index)"
                    type="text">
                    保存
                    </el-button>
                    <el-button size="mini"
                    @click="ScpeCancel(scope.row)"
                    type="text">
                    取消
                    </el-button>
                  </template>
                  <template v-else>
                    <el-button size="mini"
                    @click="editSpec(scope.row)"
                    type="text">
                    修改
                    </el-button>
                    <el-button
                    size="mini"
                    @click="delScpe(scope.row.id || scope.$index)"
                    type="text">
                      {{$route.query.id ? '删除' : '移除'}}
                    </el-button>
                  </template>
                </template>
              </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="储存温度">
          <el-select  size="small" v-model="form.storage_compartment">
            <el-option
              v-for="item in wencengList"
              :label="item.name"
              :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <label :class="$style.label"> 选填信息 </label>
        <el-form-item label="海关编码">
          <el-input v-model="form.hs_code" size="small"></el-input>
        </el-form-item>
        <el-form-item label="原产地">
          <el-select  size="small" v-model="form.origin">
            <el-option
              v-for="item in originList"
              :label="item.name_cn"
              :value="item.id" :key="item.id">
            </el-option>
          </el-select>
          <el-button @click="onOrigin" size="small">产地管理</el-button>
        </el-form-item>
        <el-form-item label="商品链接">
          <el-input v-model="form.display_link" size="small" placeholder="需添加前缀http://"></el-input>
        </el-form-item>
        <el-form-item label="商品备注">
          <el-input
            v-model="form.remark"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 6}"></el-input>
        </el-form-item>
        <el-form-item label="商品正面">
          <el-upload
            class="avatar-uploader"
            :headers="Authorization"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove"
            :action=api
            :file-list="fileList"
            name="image">
            <img v-if="this.form.photos"
            :src="imgUrl"
            class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span :class="$style.uploader_tips">*图片不可超过2M大小，图片格式为jpg、png、jpeg</span>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="$store.state.config.button_loading"
            @click="onSubmitGoods">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </mdoel-form>

    <!-- 产地管理弹窗 -->
    <el-dialog
      title="产地管理"
      :visible.sync="originListShow"
      width="50%">
      <div class="utils" :class="$style.originUtil">
        <el-button type="primary" @click="addOrigin" size="mini">添加</el-button>
      </div>

      <el-table :data="originList" border style="width: 100%">
        <el-table-column type="index" width="60">
        </el-table-column>
        <el-table-column prop="name_cn" label="产地名称">
        </el-table-column>

        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button
              @click="originEdit(scope.row)"
              type="primary"
              size="mini"
              plain>
              修改
            </el-button>
            <el-button
              @click="originDelete(scope.row.id)"
              type="danger"
              size="mini"
              plain>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 新增产地弹窗 -->
    <el-dialog
      :visible.sync="originEditShow"
      @close="cancelOrigin"
      width="40%">
      <el-row :gutter="20">
        <el-col :span="5">产地名称</el-col>
        <el-col :span="10">
          <el-input v-model="originInfo.name_cn"></el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelOrigin">取消</el-button>
        <el-button
          type="primary"
          @click="onOriginSave"
          plain :loading="$store.state.btn_loading">提交</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import MdoelForm from '@/components/form';
import mixin from '@/mixin/form_config';
import $http from '@/api';
import baseApi from './../../lib/axios/base_api';

export default {
  components: {
    MdoelForm,
  },
  mixins: [mixin],
  data() {
    return {
      originListShow: false, // 产地列表对话框
      originEditShow: false, // 产地编辑对话框
      isOriginEdit: false, // 编辑还是新增
      originInfo: {},
      form: {
        category_id: '', // 所属分类
        name_cn: '', // 仓库中文
        name_en: '', // 仓库英文
        storage_compartment: '', // 温度
        origin: '', // 原产地
        hs_code: '',
        display_link: '',
        photos: '',
        remark: '',
      },
      spec_name: '', // 添加规格名
      typeList: [], // 分类列表
      wencengList: [
        { name: '不限', id: 4 },
        { name: '常温', id: 1 },
        { name: '冷藏', id: 2 },
        { name: '冰冻', id: 3 },
      ],
      originList: [], // 产地列表
      originParams: {}, // 产地传参
      skuList: [], // 商品规格
      fileList: [],
    };
  },
  created() {
    if (!this.$route.query.id) {
      this.skuList.push(this.specsForm());
    } else {
      this.getInfo();
    }
    this.getTypeList();
    this.getOriginList();
  },
  computed: {
    Authorization() {
      return { Authorization: this.$store.state.token.token };
    },
    api() {
      return `${baseApi}/upload/image`;
    },
    imgUrl() {
      return `${baseApi}${this.form.photos}`;
    },
  },
  methods: {
    // 编辑显示
    editSpec(row) {
      this.$set(row, '$_edit', true);
    },
    // 产地管理
    onOrigin() {
      this.originListShow = true;
      this.getOriginList();
    },
    // 商品分类列表
    getTypeList() {
      $http.categoryList().then((res) => {
        this.typeList = res.data.data;
      });
    },
    // 规格取消
    ScpeCancel(row) {
      if (row.id) {
        this.$set(row, '$_edit', false);
      } else {
        for (const key in row) {
          if (Object.prototype.hasOwnProperty.call(row, key)) {
            row[key] = '';
          }
        }
        this.$set(row, '$_edit', true);
      }
    },
    // 产地列表
    getOriginList() {
      $http.originList().then((res) => {
        this.originList = res.data.data;
      });
    },
    // 保存/编辑规格
    saveSpec(row, index) {
      if (this.$route.query.id) {
        row.product_id = this.$route.query.id;
        if (row.id) row.spec_id = row.id;
        $http.addSpec(row, row.id).then(() => {
          this.$message({
            message: !row.id ? '添加成功' : '修改成功',
            type: 'success',
          });
          this.$set(row, '$_edit', false);
          this.getInfo();
        });
      } else {
        for (let i = 0; i < this.skuList.length; i += 1) {
          if (i !== index && row.relevance_code === this.skuList[i].relevance_code) {
            this.$message({
              message: '外部编码已存在',
              type: 'warning',
            });
            return;
          }
        }
        this.skuList.push(this.specsForm());
        this.$set(row, '$_edit', false);
      }
    },
    // 删除规格
    delScpe(index) {
      if (this.$route.query.id) {
        $http.delSpec({
          spec_id: index,
        }).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
          });
          this.getInfo();
        });
        return;
      }
      this.skuList.splice(index, 1);
    },
    // 新增产地弹出框
    addOrigin() {
      this.originEditShow = true;
      this.isOriginEdit = false;
    },
    // 编辑产地弹出框
    originEdit(row) {
      this.originEditShow = true;
      this.isOriginEdit = true;
      this.originInfo = Object.assign({}, row);
    },
    // 取消新增产地
    cancelOrigin() {
      this.originEditShow = false;
      this.originInfo.id = '';
      this.originInfo.name_cn = '';
    },
    // 删除产地
    originDelete(originId) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        $http.originDel({
          id: originId,
        }).then(() => {
          this.$message({
            message: '删除成功',
            type: 'success',
          });
          this.getOriginList();
        });
      });
    },
    // 保存产地
    onOriginSave() {
      $http.originAdd(this.originInfo, this.isOriginEdit).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
        });
        this.getOriginList();
        this.originEditShow = false;
      });
    },
    // 初始化表单
    specsForm() {
      return {
        name_en: '',
        name_cn: '',
        net_weight: 0,
        gross_weight: 0,
        relevance_code: '',
        $_edit: true,
      };
    },
    // 提交商品信息
    onSubmitGoods() {
      if (this.$route.query.id) {
        this.form.product_id = this.$route.query.id;
      }
      this.form.specs = this.skuList.filter(res => res.name_cn);
      $http.GoodsAdd(this.form, this.$route.query.id).then(() => {
        this.successTips(this.$route.query.id);
      });
    },
    // 获取商品单条信息
    getInfo() {
      $http.getGoodsInfo(this.$route.query.id).then((res) => {
        this.skuList = this.specsForm();
        this.form = res.data;
        this.skuList = res.data.specs.concat(this.skuList);
      });
    },
    // 上传截图成功回调
    handleAvatarSuccess(res) {
      if (res.status === 0) {
        this.form.photos = res.data.url;
      } else if (res.status === 1) {
        this.$notify({
          title: this.$t('fail'),
          message: res.msg,
          type: 'warning',
        });
      }
    },
    // 删除上传图片
    handleRemove() {
      this.form.photos = '';
    },
  },
};
</script>

<style lang="less" module>
@import '../../less/public_variable.less';
.label {
  font-size: 18px;
}
.originUtil {
  text-align: right;
  margin-bottom: 20px;
}
.uploader_tips {
  color: red;
}
</style>
