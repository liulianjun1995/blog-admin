<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input v-model="query.keyword" placeholder="关键词" size="medium" style="width: 200px;" @keyup.enter.native="handleFilter" />
        <el-select v-model="query.category" placeholder="分类" size="medium" clearable style="width: 130px" @change="handleFilter">
          <el-option label="全部：分类" :value="0" />
          <el-option v-for="item in category" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>
        <el-checkbox v-model="showAuthor" size="medium" style="margin-left:15px;">
          作者
        </el-checkbox>
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
        <el-table-column label="标题">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="封面" align="center" width="120">
          <template slot-scope="{row}">
            <el-image :src="row.cover" :preview-src-list="[row.cover]" />
          </template>
        </el-table-column>
        <el-table-column label="分类" width="90" align="center">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.category }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="showAuthor" label="作者" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="标签"
          width="100"
        >
          <template slot-scope="{row}">
            <div v-for="(tag, index) in row.tags" :key="index" style="margin: 5px 0">
              <el-tag>{{ tag }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="浏览" align="center" width="80">
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
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
              <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit(row.id)" />
            </el-tooltip>
            <el-tooltip v-if="row.status !== 'published'" class="item" effect="dark" content="发布" placement="top-end">
              <el-button type="success" size="small" icon="el-icon-position" @click="handleStatus(row, 'published')" />
            </el-tooltip>
            <el-tooltip v-if="row.status !== 'draft'" class="item" effect="dark" content="草稿" placement="top-end">
              <el-button type="danger" size="small" icon="el-icon-tickets" @click="handleStatus(row, 'draft')" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <Pagination v-show="total > 0" :total="total" :page-size="pageSize" :page.sync="query.page" @pagination="fetchData" />
  </div>
</template>

<script>
import { fetchList, fetchArticleCategory, changeStatus } from '@/api/article'
import Pagination from '@/components/Pagination'

export default {
  name: 'ArticleList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'danger'
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
      showAuthor: false,
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
    this.fetchData()
  },
  methods: {
    getCategoryList() {
      const _this = this
      fetchArticleCategory().then(res => {
        _this.category = res.data
      })
    },
    fetchData() {
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
      this.fetchData()
    },
    handleCreate() {
      this.$router.push({ name: 'article-create' })
    },
    handleEdit(id) {
      this.$router.push({ name: 'article-edit', params: { id }})
    },
    handleStatus(item, mode) {
      const statusMap = {
        published: 'published',
        draft: 'draft'
      }
      if (!statusMap[mode]) {
        return false
      }
      changeStatus(item.id, statusMap[mode]).then(() => {
        item.status = statusMap[mode]
        this.$notify({
          title: '成功',
          message: '修改文章状态成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
