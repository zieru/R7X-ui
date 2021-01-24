<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :getPopupContainer="() => $refs.noticeRef.parentElement"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <span class="header-notice" ref="noticeRef" style="padding: 0 18px">
      <a-skeleton :title="false"  :paragraph="{ rows: 1 }"  v-if="loading" active />
      <div v-else>
      <a-icon style="font-size: 16px; padding: 4px" type="clock-circle" />
      {{ time }}
      </div>
    </span>
  </a-popover>
</template>

<script>
  import moment from 'moment'
export default {
  name: 'HeaderNotice',
  data () {
    return {
      loading: true,
      visible: false,
      interval: null,
      time: null
    }
  },
    beforeDestroy () {
        // prevent memory leak
        clearInterval(this.interval)
    },
    created () {
        // update the time every second
        this.$http.get('/api/v1/datetime').then(data => {
            let datetime = moment(data.datetime, 'DD-MM-YYYY hh:mm:ss').add(1, 'second')
            this.time = datetime.format('DD-MM-YYYY HH:mm:ss')
            this.loading = false
            this.interval = setInterval(() => {
                // Concise way to format time according to system locale.
                // In my case this returns "3:48:00 am"
                /* this.time = Intl.DateTimeFormat(navigator.language, {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                }).format() */
                datetime = datetime.add(1, 'second')
                this.time = datetime.format('HH:mm:ss')
            }, 1000)
        })
    }
}
</script>

<style lang="css">
  .header-notice-wrapper {
    top: 50px !important;
  }
</style>
<style lang="less" scoped>
  .header-notice{
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
</style>
