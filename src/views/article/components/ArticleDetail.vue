<template>
  <div class="createArticle-container">
    <el-form ref="ArticleForm" v-loading="loading" :model="article" label-width="50px">

      <div class="createArticle-main-container">

        <el-form-item style="position: fixed; top: 90px; z-index: 10; right: 45px;">
          <el-button :disabled="disabled" type="success" size="medium" @click="submitForm">发布</el-button>
        </el-form-item>

        <el-form-item label="标题:">
          <el-input v-model="article.title" placeholder="标题" />
        </el-form-item>

        <el-form-item label="摘要:">
          <el-input v-model="article.abstract" type="textarea" placeholder="摘要" maxlength="150" :autosize="{ minRows: 3, maxRows: 5}" resize="none" show-word-limit />
        </el-form-item>

        <el-form-item label="分类:" class="postInfo-container-item">
          <el-select v-model="article.category_id" placeholder="分类" size="medium" clearable>
            <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="状态:">
          <el-radio-group v-model="article.status" size="medium">
            <el-radio-button :label="1">发布</el-radio-button>
            <el-radio-button :label="2">草稿</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="封面:" label-width="50px">
          <Upload class="cover-uploader" dir="article" @success="handleCoverSuccess">
            <div slot="upload">
              <img v-if="article.cover" :src="article.cover" class="cover">
              <i v-else class="el-icon-plus cover-uploader-icon" />
            </div>
          </Upload>
        </el-form-item>

        <el-form-item>
          <mavon-editor ref="mavon-editor" v-model="article.content" min-height="500px" @change="changeContent" />
        </el-form-item>

      </div>

    </el-form>
  </div>
</template>

<script>
import MavonEditor from '@/components/MavonEditor'
import Upload from '@/components/Upload'
import { fetchArticle, createArticle, updateArticle } from '@/api/article'
import { ApiCategoryOptions } from '@/api/category'

export default {
  name: 'ArticleDetail',
  components: {
    MavonEditor, Upload
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      article: {
        title: '', // 文章题目
        content: '', // 文章内容
        abstract: '', // 文章摘要
        cover: '', // 文章图片
        category_id: '', // 文章分类
        is_top: 0,
        is_recommend: 0,
        status: 1
      },
      disabled: false,
      adminListOptions: [],
      categoryList: [],
      tags: [],
      tempRoute: {}
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id)
    }
  },
  mounted() {
    this.fetchCategoryOptions()
    if (this.isEdit) {
      this.fetchData()
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchCategoryOptions() {
      const _this = this
      ApiCategoryOptions().then(res => {
        _this.categoryList = res.data
      })
    },
    fetchData() {
      const _this = this
      if (_this.id) {
        _this.loading = true
        fetchArticle(_this.id).then(res => {
          Object.assign(_this.article, res.data)
          _this.setTagsViewTitle()
          _this.setPageTitle()
        }).then(() => { _this.loading = false })
      }
    },
    setTagsViewTitle() {
      const title = '编辑文章'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑文章'
      document.title = `${title} - ${this.id}`
    },
    handleCoverSuccess(filepath) {
      this.article.cover = filepath
    },
    submitForm() {
      const _this = this
      _this.disabled = true
      if (_this.isEdit) {
        updateArticle(_this.article.id, _this.article).then(() => {
          _this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          _this.disabled = false
        }).catch(() => { _this.disabled = false })
      } else {
        createArticle(_this.article).then(() => {
          _this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          _this.$router.push({ name: 'article-list' })
          _this.disabled = false
        }).catch(() => { _this.disabled = false })
      }
    },
    changeContent(value) {
      this.article.content = value
    }
  }
}
</script>

<style>
  .cover-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .cover-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .cover-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .cover {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style lang="scss" scoped>
  .createArticle-container {
    position: relative;
    .createArticle-main-container {
      padding: 60px 45px 20px 50px;
    }
  }
</style>
