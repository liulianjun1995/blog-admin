<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input v-model="query.title" placeholder="标题" size="medium" style="width: 200px;" @keyup.enter.native="handleFilter" />
        <el-select v-model="query.importance" placeholder="重要性" size="medium" clearable style="width: 90px" @change="handleFilter">
          <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="query.type" placeholder="类型" size="medium" clearable style="width: 130px" @change="handleFilter">
          <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
        </el-select>
        <el-checkbox v-model="showReviewer" size="medium" style="margin-left:15px;">
          审核人
        </el-checkbox>
        <el-button style="float: right; margin-left: 10px;" type="primary" size="medium" icon="el-icon-edit" @click="handleCreate">
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
        <el-table-column label="序号" prop="id" align="center" fixed width="80">
          <template slot-scope="{row}">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="150px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="标题" min-width="150px">
          <template slot-scope="{row}">
            <span class="link-type">{{ row.title }}</span>
            <el-tag>{{ row.type | typeFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="作者" width="110px" align="center">
          <template slot-scope="{row}">
            <span>{{ row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="showReviewer" label="审核人" width="110px" align="center">
          <template slot-scope="{row}">
            <span style="color:red;">{{ row.reviewer }}</span>
          </template>
        </el-table-column>
        <el-table-column label="重要性" width="80">
          <template slot-scope="{row}">
            <svg-icon v-for="n in + row.importance" :key="n" icon-class="star" class="meta-item__icon" />
          </template>
        </el-table-column>
        <el-table-column label="阅读数" align="center" width="95">
          <template slot-scope="{row}">
            <span v-if="row.pageviews" class="link-type">{{ row.pageviews }}</span>
            <span v-else>0</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status | statusLabel }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="230">
          <template slot-scope="{row}">
            <el-button size="mini" type="primary" @click="handleEdit(row.id)">
              编辑
            </el-button>
            <el-button v-if="row.status !== 'published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
              发布
            </el-button>
            <el-button v-if="row.status !== 'draft'" size="mini" @click="handleModifyStatus(row,'draft')">
              草稿
            </el-button>
            <el-button v-if="row.status !== 'deleted'" size="mini" type="danger" @click="handleModifyStatus(row,'deleted')">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <Pagination v-show="total > 0" :total="total" :page.sync="query.page" :limit.sync="query.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'User',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    statusLabel(status) {
      const statusMap = {
        published: '发布',
        draft: '草稿',
        deleted: '删除'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    },
    parseTime(time, format) {
      return parseTime(time, format)
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      query: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      showReviewer: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const _this = this
      _this.listLoading = true
      fetchList(_this.query).then(response => {
        _this.list = response.data.items
        _this.total = response.data.total
        // Just to simulate the time of the request
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
