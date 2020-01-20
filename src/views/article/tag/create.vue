<template>
  <tag-detail :is-edit="false" />
</template>

<script>
import TagDetail from './components/TagDetail'

export default {
  name: 'ArticleTagCreate',
  components: {
    TagDetail
  }
}
</script>
