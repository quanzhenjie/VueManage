<template>
    <div class="FormAdvanced">
        <Card>
            <p slot="title">
                高级用法
            </p>
            <i-Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 300px">
                <FormItem
                        v-for="(item, index) in formDynamic.items"
                        v-if="item.status"
                        :key="index"
                        :label="'Item ' + item.index"
                        :prop="'items.' + index + '.value'"
                        :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                    <Row>
                        <i-Col span="18">
                            <Input type="text" v-model="item.value" placeholder="Enter something..." />
                        </i-Col>
                        <i-Col span="4" offset="1">
                            <Button @click="handleRemove(index)">Delete</Button>
                        </i-Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Row>
                        <i-Col span="12">
                            <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>
                        </i-Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formDynamic')">Submit</Button>
                    <Button @click="handleReset('formDynamic')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </i-Form>
        </Card>
    </div>
</template>

<script>
    export default {
        name: "FormAdvanced",
        data () {
            return {
                index: 1,
                formDynamic: {
                    items: [
                        {
                            value: '',
                            index: 1,
                            status: 1
                        }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                this.index++;
                this.formDynamic.items.push({
                    value: '',
                    index: this.index,
                    status: 1
                });
            },
            handleRemove (index) {
                this.formDynamic.items[index].status = 0;
            }
        }
    }
</script>

<style scoped>

</style>