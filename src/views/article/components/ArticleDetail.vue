<template>
  <div class="createArticle-container">
    <el-form ref="ArticleForm" :model="article">

      <Sticky :z-index="10" :class-name="'sub-navbar ' + article.status">
        <el-button :disabled="disabled" type="success" size="medium" @click="submitForm">发布</el-button>
      </Sticky>

      <div class="createArticle-main-container">

        <el-form-item label="标题:" label-width="50px">
          <el-input v-model="article.title" placeholder="标题" />
        </el-form-item>

        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="作者:" label-width="50px">
              <el-select v-model="article.author" :remote-method="getRemoteUserList" filterable default-first-option remote placeholder="搜索用户">
                <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label-width="120px" label="发布时间:" class="postInfo-container-item">
              <el-date-picker v-model="displayTime" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期和时间" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label-width="90px" label="重要性:" class="postInfo-container-item">
              <el-rate
                v-model="article.importance"
                :max="3"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                :low-threshold="1"
                :high-threshold="3"
                style="display:inline-block"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="状态:" label-width="50px">
          <el-radio-group v-model="article.status" size="medium">
            <el-radio-button label="published">发布</el-radio-button>
            <el-radio-button label="draft">草稿</el-radio-button>
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
            <img v-if="imageUrl" :src="imageUrl" class="cover">
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
import Sticky from '@/components/Sticky' // 粘性header组件
import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'

export default {
  name: 'ArticleDetail',
  components: {
    MavonEditor,
    Sticky
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      article: {
        status: 'draft',
        title: '', // 文章题目
        content: '', // 文章内容
        content_short: '', // 文章摘要
        source_uri: '', // 文章外链
        image_uri: '', // 文章图片
        display_time: undefined, // 前台展示时间
        id: undefined,
        comment_disabled: false,
        importance: 0
      },
      imageUrl: '',
      disabled: false,
      userListOptions: [],
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
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    }
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.article = response.data

        this.setTagsViewTitle()
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    setTagsViewTitle() {
      const title = '编辑文章'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.article.id}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    setPageTitle() {
      const title = '编辑文章'
      document.title = `${title} - ${this.article.id}`
    },
    getRemoteUserList(query) {
      searchUser(query).then(response => {
        if (!response.data.items) return
        this.userListOptions = response.data.items.map(v => v.name)
      })
    },
    handleCoverSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
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
      setTimeout(() => {
        _this.$notify({
          title: '成功',
          message: '发布文章成功',
          type: 'success',
          duration: 2000
        })
        console.log(_this.article)
        _this.disabled = false
      }, 1000)
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
      padding: 40px 45px 20px 50px;
    }
  }
</style>
