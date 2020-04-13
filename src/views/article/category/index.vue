<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-table
        ref="categoryTable"
        v-loading="listLoading"
        :data="list"
        row-key="id"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          label="ID"
          prop="id"
          align="center"
          width="80"
        />
        <el-table-column
          label="标题"
          prop="title"
          min-width="300"
        />
        <el-table-column
          label="显示"
          width="80"
          align="center"
        >
          <template slot-scope="{row}">
            <el-tag type="primary">{{ row.show | showLabel }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="排序"
          prop="order"
          width="90"
          align="center"
        />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { ApiCategoryList, ApiCategoryOrder } from '@/api/category'
import Sortable from 'sortablejs'

export default {
  name: 'ArticleCategory',
  filters: {
    showLabel(status) {
      switch (status) {
        case 1:
          return '是'
        case 0:
          return '否'
      }
    }
  },
  data() {
    return {
      listLoading: true,
      list: [],
      sortable: null
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const _this = this
      _this.listLoading = true
      ApiCategoryList(_this.query).then(res => {
        _this.list = res.data
      }).then(() => {
        _this.setSort()
      }).then(() => { _this.listLoading = false })
    },
    setSort() {
      const _this = this
      const el = _this.$refs.categoryTable.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          const targetRow = _this.list.splice(evt.oldIndex, 1)[0]
          _this.list.splice(evt.newIndex, 0, targetRow)
          ApiCategoryOrder({ list: _this.list }).then(_this.fetchData)
        }
      })
    }
  }
}
</script>

<style>
  .sortable-ghost{
    opacity: .8;
    color: #fff!important;
    background: #42b983!important;
  }
</style>
