<template>
  <div class="createArticle-container">
    <el-form ref="ArticleForm" v-loading="loading" :model="article">

      <div class="createArticle-main-container">

        <el-form-item style="position: fixed; top: 90px; z-index: 10; right: 45px;">
          <el-button :disabled="disabled" type="success" size="medium" @click="submitForm">发布</el-button>
        </el-form-item>

        <el-form-item label="标题:" label-width="50px">
          <el-input v-model="article.title" placeholder="标题" />
        </el-form-item>
        <el-form-item label="摘要:" label-width="50px">
          <el-input v-model="article.abstract" type="textarea" placeholder="摘要" maxlength="150" :autosize="{ minRows: 3, maxRows: 5}" resize="none" show-word-limit />
        </el-form-item>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="作者:" label-width="50px">
              <el-select v-model="article.user_id" filterable default-first-option placeholder="搜索用户">
                <el-option v-for="(item,index) in adminListOptions" :key="item+index" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="90px" label="分类:" class="postInfo-container-item">
              <el-select v-model="article.category_id" placeholder="分类" size="medium" clearable>
                <el-option label="全部：分类" :value="0" />
                <el-option v-for="item in categoryList" :key="item.id" :label="item.title" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="90px" label="标签:" class="postInfo-container-item">
              <el-select v-model="article.tags" multiple placeholder="请选择">
                <el-option
                  v-for="tag in tags"
                  :key="tag.id"
                  :label="tag.title"
                  :value="tag.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="状态:" label-width="50px">
          <el-radio-group v-model="article.status" size="medium">
            <el-radio-button :label="1">发布</el-radio-button>
            <el-radio-button :label="2">草稿</el-radio-button>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="封面:" label-width="50px">
          <el-upload
            class="cover-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleCoverSuccess"
            :before-upload="beforeCoverUpload"
          >
            <img v-if="article.coverUrl" :src="article.coverUrl" class="cover">
            <i v-else class="el-icon-plus cover-uploader-icon" />
          </el-upload>
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
import { fetchArticle, fetchArticleCategory, createArticle, updateArticle, fetchTagList } from '@/api/article'
import { fetchAdminOptions } from '@/api/admin'

export default {
  name: 'ArticleDetail',
  components: {
    MavonEditor
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
        coverUrl: '', // 文章图片路径
        category_id: 0, // 文章分类
        tags: [], // 文章标签
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
    displayTime: {
      get() {
        return (+new Date(this.article.display_time))
      },
      set(val) {
        this.article.display_time = new Date(val)
      }
    },
    id() {
      return this.$route.params && this.$route.params.id
    }
  },
  created() {
    this.fetchArticleCategory()
    this.fetchAdminOptions()
    this.fetchTagList()
    if (this.isEdit) {
      this.fetchData()
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchArticleCategory() {
      const _this = this
      fetchArticleCategory().then(res => {
        _this.categoryList = res.data
      })
    },
    fetchTagList() {
      const _this = this
      fetchTagList().then(res => {
        _this.tags = res.data
      })
    },
    fetchAdminOptions() {
      fetchAdminOptions().then(res => {
        if (!res.data) return
        this.adminListOptions = res.data
      })
    },
    fetchData() {
      const _this = this
      if (_this.id) {
        _this.loading = true
        fetchArticle(_this.id).then(res => {
          res.data.tags = Array.from(res.data.tags, t => t.id)
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
    handleCoverSuccess(res, file) {
      this.article.cover = URL.createObjectURL(file.raw)
    },
    beforeCoverUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
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
        })
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
        })
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
