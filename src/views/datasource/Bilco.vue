<template>
  <a-row>
    <div class="card-container">
      <a-tabs default-active-key="1">
        <a-form-model layout="inline" :model="toolbardata" slot="tabBarExtraContent">
          <a-button type="primary" :loading="loadingtable" @click="fetch()">
            Reload
          </a-button>
          <a-date-picker
            @change="onChangeDate"
            v-model="toolbardata.datepick"
            format="YYYY-MM-DD"
          />
        </a-form-model>
        <a-tab-pane key="1" tab="Data">
          <a-row>
            <a-table
              :pagination="false"
              size="small"
              bordered
              :columns="columnsimport"
              :data-source="dataimport"
              :loading="loadingtable"
            >
              <span slot="status" slot-scope="status">
                <a-tag
                  :key="status"
                  :color="status.length > 5 ? 'green' : 'red'"
                >
                  {{ status.toUpperCase() }}
                </a-tag>
              </span>
            </a-table>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-row>
</template>
<script>
    import moment from 'moment'
    const columnsimport = [
        {
            title: 'Started / Finish',
            dataIndex: 'updated_at'
        },
        {
            title: 'file name',
            dataIndex: 'filename'
        },
        {
            title: 'status',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
        },
        {
            title: 'importedRow',
            dataIndex: 'importedRow'
        }
    ]
    export default {
        name: 'Bilco',
        data () {
          return {
              columnsimport,
              loadingtable: false,
              dataimport: [],
              toolbardata: {
                datepick: moment().format('YYYY-MM-DD')
              }
          }
        },
      methods: {
        fetch (params = { start: this.toolbardata.datepick }) {
            this.loadingtable = true
            this.$http.get('/api/v1/importer?tipe=bilcollection:import', {
                params: { ...{ start: this.toolbardata.datepick } }
            }).then(data => {
                  // const pagination = { ...this.paginationnasional }
                  // pagination.total = data.recordsTotal
                  const datasource = data.data
                  const dataimport = []
                  this.loadingtablenasional = false
                  datasource.forEach(function (entry) {
                      let finish = entry.updated_at
                      if (entry.status !== 'Finish') finish = 'Not Finish'
                      dataimport.push({ ...entry, updated_at: finish })
                  })
                  this.setData(dataimport)
                  // this.paginationnasional = pagination
                this.loadingtable = false
              }).catch(err => {
                  console.log(err)
                this.loadingtable = false
            })
          },
          setData (res) {
            console.log(res)
            this.dataimport = res
          },
        onChangeDate (date, dateString) {
            this.toolbardata.datepick = dateString
          this.fetch()
        }
      }
    }
</script>

<style>
  .card-container {
    background: #f5f5f5;
    overflow: hidden;
  }
  .card-container > .ant-tabs-card > .ant-tabs-content {
    min-height: 120px;
    margin-top: -16px;
  }

  .card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
    background: #fff;
    padding: 16px;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar {
    border-color: #fff;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
    border-color: transparent;
    background: transparent;
  }

  .card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
    border-color: #fff;
    background: #fff;
  }
</style>
