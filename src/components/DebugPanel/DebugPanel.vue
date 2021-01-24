<template>
  <div class="setting-drawer">
    <a-drawer
      width="980"
      placement="right"
      @close="onClose"
      :closable="false"
      :visible="visible"
    >
      <div class="setting-drawer-index-content">
        <a-list item-layout="vertical" size="large" :data-source="debugState.slice().reverse()">
          <a-list-item slot="renderItem" key="item.title" slot-scope="item">
            <a-descriptions layout="vertical" bordered size="small">
              <a-descriptions-item label="Status" :span="3">
                <a-badge status="processing" :text="'Error ' + item.debug.errors"></a-badge>
                 | <b>{{ $moment(item.date).format('YYYY-MM-DD HH:mm:ss') }}</b>
              </a-descriptions-item>
              <a-descriptions-item label="Message">
                {{ item.debug.message }}
              </a-descriptions-item>
              <a-descriptions-item label="Exception">
                {{ item.debug.exception }}
              </a-descriptions-item>
              <a-descriptions-item>
              </a-descriptions-item>
              <a-descriptions-item label="Config Info">
                <a-collapse title="details" :bordered="false">
                  <a-collapse-panel header="Trace">
                    <a-list item-layout="vertical" size="large" :data-source="item.debug.trace">
                      <a-list-item slot="renderItem" key="item.title" slot-scope="itemtrace">
                        <a-collapse title="details">
                          <a-collapse-panel :header="itemtrace.class + ' - ' + itemtrace.file + ' line:' + itemtrace.line ">
                            {{ itemtrace.args }}
                          </a-collapse-panel>
                        </a-collapse>
                      </a-list-item>
                    </a-list>
                  </a-collapse-panel>
                </a-collapse>
              </a-descriptions-item>
            </a-descriptions>
          </a-list-item>
        </a-list>
      </div>
      <div class="setting-drawer-index-handle" @click="toggle" slot="handle">
        <a-icon type="security-scan" v-if="!visible"/>
        <a-icon type="close" v-else/>
      </div>
    </a-drawer>
  </div>
</template>

<script>
    import { DetailList } from '@/components'
    import { mixin, mixinDevice } from '@/utils/mixin'
    import { mapActions, mapState } from 'vuex'

    export default {
        components: {
            DetailList
        },
        mixins: [mixin, mixinDevice],
        data () {
            return {
                visible: false
            }
        },
        computed: {
            ...mapState({
                debugState: (state) => state.user.debug
            })
        },
        watch: {
            '$store.state.user.debug': function () {
                console.log(Object.assign({}, this.debugState))
            }
        },
        methods: {
            showDrawer () {
                this.visible = true
            },
            onClose () {
                this.visible = false
            },
            toggle () {
                // this.$store.dispatch('debugPanel', 'error1')
                this.visible = !this.visible
            },
            ...mapActions(['debugPanel'])
        }
    }
</script>

<style lang="less" scoped>

  .setting-drawer-index-content {

    .setting-drawer-index-blockChecbox {
      display: flex;

      .setting-drawer-index-item {
        margin-right: 16px;
        position: relative;
        border-radius: 4px;
        cursor: pointer;

        img {
          width: 48px;
        }

        .setting-drawer-index-selectIcon {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          padding-top: 15px;
          padding-left: 24px;
          height: 100%;
          color: #1890ff;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .setting-drawer-theme-color-colorBlock {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      float: left;
      cursor: pointer;
      margin-right: 8px;
      padding-left: 0px;
      padding-right: 0px;
      text-align: center;
      color: #fff;
      font-weight: 700;

      i {
        font-size: 14px;
      }
    }
  }

  .setting-drawer-index-handle {
    position: absolute;
    top: 284px;
    background: red;
    width: 48px;
    height: 48px;
    right: 980px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    z-index: 1002;
    text-align: center;
    font-size: 16px;
    border-radius: 4px 0 0 4px;

    i {
      color: rgb(255, 255, 255);
      font-size: 20px;
    }
  }
</style>
