<template>
  <div class="add-form">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :label-col="labelCol"
      :rules="rules"
      style="width: 40%"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item prop="name" label="Name">
        <a-input placeholder="Please input name" v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item prop="url" label="URL">
        <a-input placeholder="e.g https://www.hepsiburada.com" prop="url" v-model="form.url" />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 24}">
        <a-button type="primary" id="clickSave" @click="onSubmit('success')"> Create </a-button>
        <a-button style="margin-left: 10px" @click="goToRoute">
          Cancel
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: "listPage",
  props: {
      clickSave: {
        type: Function
      }
  },
  data() {
    return {
      list: [],
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      rules: {
        name: [
          { required: true, message: "Please input name", trigger: "blur" },
        ],
        url: [{ type: 'url', required: true, message: "Please input valid URL", trigger: "blur" }],
      },
      form: {
        name: "",
        url: "",
      },
    };
  },
  methods: {
    goToRoute() {
      this.$router.push({ name: "listPage" });
    },
    onSubmit(type) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
        this.$notification[type]({
        message: 'Success',
        description:
          'You successfully added a new item',
         });
          let date = new Date();
          this.list.push({
            name: this.form.name,
            url: this.form.url,
            points: 0,
            eventClicked: date,
          });
          localStorage.setItem("list", JSON.stringify(this.list));
          this.goToRoute()
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    this.list = JSON.parse(localStorage.getItem("list"));
    console.log(this.list);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-form {
    display: flex;
    justify-content: center;
}
</style>
