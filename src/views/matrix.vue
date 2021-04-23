<template>
  <a-card :loading="loading">
  <a-form-model v-bind="layout">
    <a-form-model-item has-feedback label="Nama Alternatif" prop="pass">
      <a-input v-model="form.name" disabled="true" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="Matrix">
      <div  v-for="(input,k) in kriteria" :key="k" style="border: dashed 1px #ccc">
        <a-form-model-item has-feedback :label="'*' + input.name" style="margin-bottom: 0px;">
        <a-radio-group v-model="formMatrix[input.id]" default-value="a" button-style="solid" v-for="ik in 5" :key="ik">
          <a-radio-button :value="ik">
            {{ ik }}
          </a-radio-button>
        </a-radio-group>
        </a-form-model-item>
      </div>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
      <a-tooltip placement="right">
        <template slot="title">
          <span v-if="Object.keys(formMatrix).length !== this.lengthMatrix">Select all matrix to submit</span>
        </template>
        <a-button :disabled="Object.keys(formMatrix).length !== this.lengthMatrix" type="primary" @click="submitForm()">
          Submit
        </a-button>
      </a-tooltip>
    </a-form-model-item>
  </a-form-model>
    <a-form-model v-bind="layout">
      <a-form-model-item has-feedback label="Alat">
        <a-form-model-item style="margin-bottom: 0px;">
          <a-checkbox-group v-model="formAlat[input.id]" v-for="(input,k) in alat" :key="k" >
            <a-checkbox :value="input.id">{{ input.name }}</a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 18, offset: 6 }">
        <a-button type="primary" @click="submitAlat()">
          Submit Alat
        </a-button>
      </a-form-model-item>
    </a-form-model>
    {{ formAlat }}
    <!--<span>{{ formMatrix }}</span>
    <p>{{ Object.keys(formMatrix).length }}</p>
    <p>{{ this.lengthMatrix }}</p>-->
  </a-card>
</template>
<script>
    export default {
        name: 'Tambah',
        props: ['matrixid'],
        data () {
            return {
                loading: true,
                layout: {
                    labelCol: { span: 6 },
                    wrapperCol: { span: 18 }
                },
                form: {
                    name: '',
                    id: null
                },
                formMatrix: {
                },
                formAlat: [],
                lengthMatrix: 0,
                lengthAlat: 0,
                datakriteria: [],
                dataalat: [],
                alat: [],
                kriteria: [],
                confirmLoading: false,
                visible: false,
                labelCol: { span: 4 },
                wrapperCol: { span: 14 }
            }
        },
        watch: {
            matrixid: function (newVal, oldVal) { // watch it
                this.loading = true
                this.loadMatrix(newVal)
            }
        },
        mounted () {
            this.loadMatrix(this.matrixid)
            this.loadAlat(this.matrixid)
        },
        methods: {
            addAlat (record) {
                if (record.id_alternatif > 0) {
                    this.alat.push({
                        name: record.nm_alternatif,
                        id: record.id_alternatif
                    })
                }
                return true
            },
            addKriteria (record) {
                if (record.id_kriteria > 0) {
                    this.kriteria.push({
                        name: record.nama_kriteria,
                        id: record.id_kriteria
                    })
                }
                return true
            },
            clearKriteria () {
                this.loading = true
                this.kriteria.length = 0
                this.lengthMatrix = 0
                this.formMatrix = {}
                return true
            },
            clearAlat () {
                this.loading = true
                this.alat.length = 0
                this.lengthAlat = 0
                this.formAlat = {}
                return true
            },
            loadMatrix (newVal) {
                this.$http.get('api/v1/alternatif/' + newVal).then(data => {
                    this.clearKriteria()
                    if (data) {
                        this.form.name = data.data.nm_alternatif
                        this.form.id = data.data.id_alternatif
                        this.$http.get('api/v1/kriteria').then(data => {
                            this.datakriteria = data.data
                            this.lengthMatrix = Object.keys(this.datakriteria).length
                            Object.keys(this.datakriteria).forEach(key => {
                                console.log(this.datakriteria[key]) // the value of the current key.
                                this.addKriteria(this.datakriteria[key])
                            })
                        })
                        this.addKriteria(this.datakriteria)
                        this.loading = false
                    }
                })
              return true
            },
            loadAlat (newVal) {
                this.$http.get('api/v1/alternatif/' + newVal).then(data => {
                    this.clearAlat()
                    if (data) {
                        this.form.name = data.data.nm_alternatif
                        this.form.id = data.data.id_alternatif
                        this.$http.get('api/v1/alat').then(data => {
                            this.dataalat = data.data
                            this.lengthAlat = Object.keys(this.dataalat).length
                            Object.keys(this.dataalat).forEach(key => {
                                console.log(this.dataalat[key]) // the value of the current key.
                                this.addAlat(this.dataalat[key])
                            })
                        })
                        this.addAlat(this.dataalat)
                        this.loading = false
                    }
                })
                return true
            },
            show () {
                this.visible = true
                return true
            },
            showModal () {
                this.visible = true
            },
            submitForm (e) {
                console.log(this.form)
                this.$http.post('api/v1/matrix', {
                    kriteria: this.formMatrix,
                    alternatif: this.form.id
                })
                /* this.ModalText = 'The modal will be closed after two seconds'
                this.confirmLoading = true
                setTimeout(() => {
                    this.visible = false
                    this.confirmLoading = false
                }, 2000) */
            },
            submitAlat (e) {
                console.log(this.formAlat)
                this.$http.post('api/v1/alatmatrix', {
                    alat: this.formAlat,
                    alternatif: this.form.id
                })
                /* this.ModalText = 'The modal will be closed after two seconds'
                this.confirmLoading = true
                setTimeout(() => {
                    this.visible = false
                    this.confirmLoading = false
                }, 2000) */
            },
            handleCancel (e) {
                console.log('Clicked cancel button')
                this.visible = false
            }
        }
    }
</script>
