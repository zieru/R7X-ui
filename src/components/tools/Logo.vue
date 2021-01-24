<template>
  <div class="logo">
    <router-link :to="{name:'dashboard'}">
      <h1 v-if="showTitle">{{ title }}</h1> | <small>{{ subtitle }}</small>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: process.env.VUE_APP_NAME,
      required: false
    },
    subtitle: {
        type: String,
        default: process.env.VUE_APP_SUBNAME,
        required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
