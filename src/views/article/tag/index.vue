<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input v-model="query.keyword" placeholder="关键词" size="medium" style="width: 200px;" @keyup.enter.native="initPage" />
        <el-button style="margin-left: 10px;" type="primary" size="medium" icon="el-icon-edit" @click="handleCreate">
          添加
        </el-button>
      </div>
      <el-table
        :data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }]"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        />
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        />
        <el-table-column
          prop="address"
          label="地址"
        />
      </el-table>
    </el-card>
    <el-dialog
      :title="tagFormDialog.title"
      :visible.sync="tagFormDialog.show"
      :destroy-on-close="true"
      width="40%"
    >
      <TagDetail :is-edit="tagFormDialog.isEdit" />
    </el-dialog>
  </div>
</template>

<script>
import TagDetail from './components/TagDetail'

export default {
  name: 'ArticleTags',
  components: {
    TagDetail
  },
  data() {
    return {
      query: {
        page: 1,
        keyword: ''
      },
      total: 0,
      pageSize: 10,
      tagFormDialog: {
        show: false,
        isEdit: false,
        title: ''
      }
    }
  },
  methods: {
    initPage() {
      this.query.page = 1
      this.fetchData()
    },
    fetchData() {

    },
    handleCreate() {
      this.tagFormDialog.show = true
      this.tagFormDialog.title = '添加标签'
    }
  }
}
</script>

<style scoped>

</style>
