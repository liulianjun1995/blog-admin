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
        v-loading="listLoading"
        :data="list"
        border
      >
        <el-table-column
          prop="id"
          label="ID"
          align="center"
          width="100"
        />
        <el-table-column
          prop="title"
          label="名称"
        />
        <el-table-column
          align="center"
          label="状态"
          width="100"
        >
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status | statusLabel }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          align="center"
          label="创建时间"
          width="180"
        />
        <el-table-column
          align="center"
          label="操作"
          width="180"
        >
          <template slot-scope="{row}">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
              <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(row)" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      :title="tagFormDialog.title"
      :visible.sync="tagFormDialog.show"
      :destroy-on-close="true"
      width="40%"
      @close="closeTagDetail"
    >
      <TagDetail v-if="tagFormDialog.show" :id="tagFormDialog.id" :is-edit="tagFormDialog.isEdit" @update="initPage" @handleClose="closeTagDetail" />
    </el-dialog>
  </div>
</template>

<script>
import TagDetail from './components/TagDetail'
import { fetchTagList } from '@/api/article'

export default {
  name: 'ArticleTags',
  components: {
    TagDetail
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        enabled: 'success',
        disabled: 'danger'
      }
      return statusMap[status]
    },
    statusLabel(status) {
      const statusMap = {
        enabled: '启用',
        disabled: '禁用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      listLoading: false,
      list: [],
      query: {
        page: 1,
        keyword: ''
      },
      total: 0,
      pageSize: 10,
      tagFormDialog: {
        show: false,
        isEdit: false,
        title: '',
        id: 0
      }
    }
  },
  mounted() {
    this.initPage()
  },
  methods: {
    initPage() {
      this.query.page = 1
      this.fetchData()
    },
    fetchData() {
      const _this = this
      _this.listLoading = true
      fetchTagList(_this.query).then(res => {
        _this.list = res.data
      }).then(() => { _this.listLoading = false })
    },
    handleCreate() {
      this.tagFormDialog.show = true
      this.tagFormDialog.title = '添加标签'
    },
    handleEdit(row) {
      this.tagFormDialog.id = row.id
      this.tagFormDialog.show = true
      this.tagFormDialog.title = '编辑标签'
      this.tagFormDialog.isEdit = true
    },
    closeTagDetail() {
      this.tagFormDialog = {
        show: false,
        isEdit: false,
        title: '',
        id: 0
      }
    }
  }
}
</script>

<style scoped>

</style>
