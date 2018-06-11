<template>
  <div class="noticeAdd">
    <h3 class="border-l-h3">新建公告</h3>
    <div class="form-box">
      <el-row :gutter="10">
        <el-col class="item" :sm="{span:12}" :xs="{span:24}">
          <p class="tit">公告标题：</p>
          <div class="inp-box">
            <el-input type="text" v-model="form.title" placeholder="请输入（**个字以内）"></el-input>
          </div>
        </el-col>
        <el-col class="item" :sm="{span:12}" :xs="{span:24}">
          <p class="tit">标签文字：</p>
          <div class="inp-box">
            <el-input type="text" v-model="form.labelMsg" placeholder="请输入（一个字）"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="item" :xs="{span:24}">
          <p class="tit">发布部门</p>
          <div class="inp-box">
            <el-select v-model="form.departmentId" placeholder="请选择">
							<el-option v-for="(item,key) in deparments" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="item" :xs="{span:24}">
          <p class="tit">设&nbsp;&nbsp;置</p>
          <div class="inp-box">
            <el-checkbox :true-label="1" :false-label="0" v-model="stickFlag">置顶</el-checkbox>
            <el-checkbox :true-label="1" :false-label="0" v-model="stickFlag">同步到门户</el-checkbox>
            <el-checkbox :true-label="1" :false-label="0" v-model="stickFlag">管家助手中显示</el-checkbox>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="notice-wrap">
      <p>公告内容
        <i>编辑中</i>
      </p>  
    </div>>
  </div>
</template>

<script>
  const resetForm = () => {
    return {
      title:'',
      labelMsg:'',
      departmentId:'',
      fileUrl:'',
      stickFlag:''
    }
  }
  export default {
    name: 'noticeAdd',
    data() {
      return {
        form: resetForm()
      }
    },
    methods:{
      pageReset() {
        this.form = resetForm();
      },
      pageInit(params) {
        let {
          title = '',
          labelMsg = '',
          departmentId = '',
          fileUrl = '',
          stickFlag = ''
        } = params;
        this.form ={
          title,
          labelMsg,
          departmentId,
          fileUrl,
          stickFlag
        }
      }
    },
    beforeMount() {
      let params = this.$route.params;
      let { isAdd } = params;
      if(isAdd) {
        // 新增页，重置数据
        this.pageReset()
      }else {
        // 编辑页，初始化数据
        this.pageInit(params)
      }
    }
  }

</script>
<style lang="less">
  border-l-h3{
    line-height: 30px;
    height: 30px;
    border-left: 3px solid #3BA0FF;
    padding-left: 35px;
    font-size: 25px;
    margin: 6px 0;
  }
</style>

