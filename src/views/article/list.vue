<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input
          v-model="query.keyword"
          placeholder="请输入关键词"
          size="medium"
          style="width: 250px; float: right"
          @keyup.enter.native="handleFilter"
        >
          <el-button slot="append" icon="el-icon-search" @click="handleFilter" />
        </el-input>

        <el-select
          v-model="query.category_id"
          placeholder="分类"
          size="medium"
          clearable
          style="width: 150px"
          @change="handleFilter"
        >
          <el-option v-for="item in category" :key="item.id" :label="item.title" :value="item.id" />
        </el-select>

        <el-checkbox v-model="showAuthor" size="medium" style="margin-left:15px;">
          作者
        </el-checkbox>
      </div>

      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          label="ID"
          prop="id"
          align="center"
          fixed
          width="80"
        />
        <el-table-column
          label="标题"
          prop="title"
          min-width="300"
        />
        <el-table-column
          label="封面"
          align="center"
          width="120"
        >
          <template slot-scope="{row}">
            <el-image :src="row.cover" :preview-src-list="[row.cover]" />
          </template>
        </el-table-column>
        <el-table-column
          label="分类"
          width="90"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag type="primary">{{ row.category }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-if="showAuthor"
          label="作者"
          prop="author"
          width="110px"
          align="center"
        />
        <el-table-column
          label="浏览"
          align="center"
          prop="views"
          width="80"
        />
        <el-table-column
          label="置顶"
          width="70"
          align="center"
        >
          <template slot-scope="{row}">
            <el-switch
              v-model="row.top"
              :active-value="1"
              :inactive-value="0"
              @change="handleTop(row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="推荐"
          width="70"
          align="center"
        >
          <template slot-scope="{row}">
            <el-switch
              v-model="row.recommend"
              :active-value="1"
              :inactive-value="0"
              @change="handleRecommend(row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="70"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status | statusLabel }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="发布时间"
          width="160px"
          prop="created_at"
          align="center"
        />
        <el-table-column
          align="center"
          fixed="right"
          width="120"
        >
          <template slot="header">
            <el-tooltip class="item" effect="dark" content="添加文章" placement="top">
              <el-button type="primary" circle size="medium" icon="el-icon-plus" @click="handleCreate" />
            </el-tooltip>
          </template>
          <template slot-scope="{row}">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-end">
              <el-button type="primary" size="small" circle icon="el-icon-edit" @click="handleEdit(row.id)" />
            </el-tooltip>
            <el-tooltip v-if="row.status !== 'published'" class="item" effect="dark" content="发布" placement="top-end">
              <el-button type="success" size="small" circle icon="el-icon-position" @click="handleStatus(row, 'published')" />
            </el-tooltip>
            <el-tooltip v-if="row.status !== 'draft'" class="item" effect="dark" content="草稿" placement="top-end">
              <el-button type="danger" size="small" circle icon="el-icon-tickets" @click="handleStatus(row, 'draft')" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <Pagination v-show="total > 0" :total="total" :page.sync="query.page" :page-size="pageSize" @pagination="fetchData" />
  </div>
</template>

<script>
import { fetchList, changeProfile } from '@/api/article'
import { ApiCategoryOptions } from '@/api/category'
import Pagination from '@/components/Pagination'

const defaultQuery = () => {
  return {
    page: 1,
    category: '',
    keyword: ''
  }
}

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
      query: defaultQuery()
    }
  },
  mounted() {
    this.fetchCategoryOptions()
    this.fetchData()
  },
  methods: {
    initPage() {
      this.query = defaultQuery()
      this.fetchData()
    },
    fetchCategoryOptions() {
      const _this = this
      ApiCategoryOptions().then(res => {
        _this.category = res.data
      })
    },
    fetchData() {
      const _this = this
      _this.listLoading = true
      fetchList(_this.query).then(res => {
        _this.list = res.items
        _this.total = res.total
        _this.pageSize = res.pageSize
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
    handleStatus(row, mode) {
      const _this = this
      const statusMap = {
        published: 'published',
        draft: 'draft'
      }
      if (!statusMap[mode]) {
        return false
      }
      changeProfile(row.id, { key: 'status', value: statusMap[mode] }).then(() => {
        row.status = statusMap[mode]
        _this.$notify({
          title: '成功',
          message: '修改文章状态成功',
          type: 'success'
        })
      })
    },
    handleTop(row) {
      const _this = this
      changeProfile(row.id, { key: 'top', value: row.top }).then(() => {
        _this.$notify({
          title: '成功',
          message: '文章' + (row.top ? '置顶' : '取消置顶') + '成功',
          type: 'success'
        })
      })
    },
    handleRecommend(row) {
      const _this = this
      changeProfile(row.id, { key: 'recommend', value: row.recommend }).then(() => {
        _this.$notify({
          title: '成功',
          message: '文章' + (row.top ? '推荐' : '取消推荐') + '成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
