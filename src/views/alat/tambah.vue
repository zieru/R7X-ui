<template>
  <a-modal
    title="Tambah Alat"
    :visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form-model :model="form" layout="vertical">
      <a-form-model-item label="Nama Alternatif">
        <a-input v-model="form.name" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>
<script>
    export default {
        name: 'Tambah',
        data () {
            return {
                confirmLoading: false,
                visible: false,
                labelCol: { span: 4 },
                wrapperCol: { span: 14 },
                form: {
                    name: ''
                }
            }
        },
        methods: {
            show () {
                this.visible = true
                return true
            },
            showModal () {
                this.visible = true
            },
            handleOk (e) {
                console.log(this.form)
                this.$http.post('api/v1/alat', {
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
