<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- <lang-select></lang-select> -->
      <Clock class="action"/>
      <a-dropdown :trigger="['click']">
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar"/>
          <span>{{ nickname }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user"/>
              <span>Profile</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>Settings</span>
            </router-link>
          </a-menu-item>

          <a-menu-divider/>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>Logout</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import Clock from '@/components/Clock'
import { mapActions, mapGetters } from 'vuex'
import LangSelect from '../tools/LangSelect'
export default {
  name: 'UserMenu',
  components: {
      Clock,
      LangSelect
  },
  computed: {
    ...mapGetters(['nickname', 'avatar'])

  },
  methods: {
    ...mapActions(['Logout']),
    handleLogout () {
      this.$confirm({
        title: 'Logout',
        content: 'Do you want to logout ?',
        onOk: () => {
          return this.Logout({}).then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 16)
          }).catch(err => {
            this.$message.error({
              title: 'Error',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
