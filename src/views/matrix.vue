<template>
  <div>
    <a-form-model :model="form" layout="vertical">
      <a-form-model-item label="Matrix">
        <a-input :disabled="true" v-model="form.name" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
    export default {
        name: 'Tambah',
        props: ['matrixid'],
        data () {
            return {
                form: {
                    name: '',
                    id: null
                },
                datakriteria: [],
                kriteria: {},
                confirmLoading: false,
                visible: false,
                labelCol: { span: 4 },
                wrapperCol: { span: 14 }
            }
        },
        watch: {
            matrixid: function (newVal, oldVal) { // watch it
                this.loadMatrix(newVal)
            }
        },
        mounted () {
            this.loadMatrix(this.matrixid)
        },
        methods: {
            addKriteria (id, name) {

            },
            loadMatrix (newVal) {
                this.$http.get('api/v1/alternatif/' + newVal).then(data => {
                    if (data) {
                        this.form.name = data.data.nm_alternatif
                        this.$http.get('api/v1/kriteria').then(data => {
                            this.datakriteria = data.data
                            console.log(typeof this.datakriteria)
                            Object.keys(this.datakriteria).forEach(key => {
                                console.log(key) // the name of the current key.
                                console.log(this.datakriteria[key]) // the value of the current key.
                                this.addKriteria(this.datakriteria[key].id_kriteria, this.datakriteria[key].nama_kriteria)
                            })
                        })
                        this.addKriteria(this.datakriteria)
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
            handleOk (e) {
                console.log(this.form)
                this.$http.post('api/v1/alternatif', {
                    name: this.form.name
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
            },
            onSubmit () {
                console.log('submit!', this.form)
            }
        }
    }
</script>
