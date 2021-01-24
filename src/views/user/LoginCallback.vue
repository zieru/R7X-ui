<template>
  <div>Loading</div>
</template>

<script>
    import { mapActions } from 'vuex'
    import { timeFix } from '../../utils/util'
    export default {
        name: 'LoginCallbackVue',
        created () {
            if (this.$route.query.access_token) {
                this.LoginCallBack(this.$route.query.access_token)
                setTimeout(() => {
                    this.$notification.success({
                        message: 'Welcome Aboard',
                        description: `${timeFix()}，Welcome back`
                    })
                }, 10000)
                //  Cookies.set(ACCESS_TOKEN, this.$route.query.access_token)
            }
        },
        methods: {
            ...mapActions(['LoginCallBack'])
        }
    }
</script>

<style scoped>

</style>
