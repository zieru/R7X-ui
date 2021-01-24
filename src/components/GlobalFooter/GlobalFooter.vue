<template>
  <div class="footer">
    <div class="links">
      Made with
      <a-icon type="smile" /> |
      <a
        href="https://github.com/zieru"
        target="_blank"
      >
        <a-icon type="github" />
        {{ AppAuthor }}
      </a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" /><span> {{ BackendV.name }} {{ AppVer }} {{ AppBuildDate }}</span>
      <br>
      <small>ui : Vue {{ vueVersion }} | backend : Laravel {{ BackendV.version }}</small>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'GlobalFooter',
    computed: {
        vueVersion () {
            return Vue.version
        },
        backendVersion () {
          return this.$store.getters.userInfo.version
        },
        backendDetail () {
            return this.$store.getters.userInfo.App
        }
    },
  data () {
    return {
      AppVer: process.env.PACKAGE_VERSION,
      AppBuildDate: process.env.PACKAGE_VERSION_BUILD_DATE,
      AppName: process.env.VUE_APP_NAME,
      AppAuthor: process.env.VUE_APP_AUTHOR,
      BackendV: {
          version: 0,
          name: null
      }
    }
  },
  mounted () {
    this.getBackenddetail()
  },
  methods: {
      getBackenddetail () {
          this.BackendV = this.$store.getters.userInfo.App
          return true
      }
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
