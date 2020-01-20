<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input v-model="query.keyword" placeholder="关键词" size="medium" style="width: 200px;" @keyup.enter.native="handleFilter" />
        <el-select v-model="query.category" placeholder="分类" size="medium" clearable style="width: 130px" @change="handleFilter">
          <el-option label="全部：分类" :value="0" />
          <el-option v-for="item in category" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
        <el-button style="margin-left: 10px;" type="primary" size="medium" icon="el-icon-edit" @click="handleCreate">
          添加
        </el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column label="ID" prop="id" align="center" fixed width="80">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="封面" align="center" width="120">
          <template slot-scope="{row}">
            <el-image :src="row.cover" :preview-src-list="[row.cover]" />
          </template>
        </el-table-column>
        <el-table-column label="分类" min-width="80px" align="center">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作者" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="阅读数" align="center" width="95">
          <template slot-scope="{row}">
            <span v-if="row.view_count" class="link-type">{{ row.view_count }}</span>
            <span v-else>0</span>
          </template>
        </el-table-column>
        <el-table-column class-name="status-col" label="状态" width="70" align="center">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status | statusLabel }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" width="160px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.created_at }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="230">
          <template slot-scope="{row}">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(row.id)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <Pagination v-show="total > 0" :total="total" :page-size="pageSize" :page.sync="query.page" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList, fetchArticleCategory } from '@/api/article'
import Pagination from '@/components/Pagination'

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info'
      }
      return statusMap[status]
    },
    statusLabel(status) {
      const statusMap = {
        published: '发布',
        draft: '草稿'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      category: [],
      total: 0,
      pageSize: 0,
      listLoading: true,
      query: {
        page: 1,
        category: 0
      }
    }
  },
  created() {
    this.getCategoryList()
    this.getList()
  },
  methods: {
    getCategoryList() {
      const _this = this
      fetchArticleCategory().then(res => {
        _this.category = res.data
      })
    },
    getList() {
      const _this = this
      _this.listLoading = true
      fetchList(_this.query).then(response => {
        _this.list = response.items
        _this.total = response.total
        _this.pageSize = response.pageSize
      }).then(() => { _this.listLoading = false })
    },
    handleFilter() {
      this.query.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    handleCreate() {
      this.$router.push({ name: 'article-create' })
    },
    handleEdit(id) {
      this.$router.push({ name: 'article-edit', params: { id }})
    }
  }
}
</script>
