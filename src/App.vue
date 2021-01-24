<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <div v-if="$installer.canInstall">
        <button @click="$installer.prompt"/>
      </div>
      <p v-if="$installer.choice">
        User {{ $installer.choice }} prompt.
      </p>
      <p v-if="$installer.hasInstalled">
        App installed successfully.
      </p>
      <router-view/>
    </div>
  </a-config-provider>
</template>

<script>
import enUS from 'ant-design-vue/lib/locale-provider/en_US'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data () {
    return {
      locale: enUS
    }
  },
  mounted () {

  },
  created () {
      if (this.$workbox) {
          this.$workbox.addEventListener('beforeinstallprompt', (event) => {
              console.log('👍', 'beforeinstallprompt', event)
              // Stash the event so it can be triggered later.
              window.deferredPrompt = event
          })
          this.$workbox.addEventListener('waiting', () => {
              this.showUpgradeUI = true
          })
          this.$workbox.addEventListener('click', () => {
              console.log('👍', 'butInstall-clicked')
              const promptEvent = window.deferredPrompt
              if (!promptEvent) {
                  // The deferred prompt isn't available.
                  return
              }
              // Show the install prompt.
              promptEvent.prompt()
              // Log the result
              promptEvent.userChoice.then((result) => {
                  console.log('👍', 'userChoice', result)
                  // Reset the deferred prompt variable, since
                  // prompt() can only be called once.
                  window.deferredPrompt = null
              })
          })
      }
  },

    methods: {
        async accept () {
            this.showUpgradeUI = false
            await this.$workbox.messageSW({ type: 'SKIP_WAITING' })
        }
    }
}
</script>
