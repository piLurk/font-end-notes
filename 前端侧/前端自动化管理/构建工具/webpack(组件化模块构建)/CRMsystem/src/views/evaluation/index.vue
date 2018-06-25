<template>
  <div id="evaluation" class="evaluation-container">
    <div class="evaluation-content" :class="{longWidth : !sidebar.opened}">
      <div class="form-box">
				<div class="inp-item">
					<p>合同编号：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch"  type="text" v-model.trim="form.contractNumber" placeholder="请输入">
					</div>
				</div>
        <div class="inp-item">
					<p>管家姓名：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch"  type="text" v-model.trim="form.stewardName" placeholder="请输入">
					</div>
				</div>
        <div class="inp-item">
					<p>租客姓名：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch"  type="text" v-model.trim="form.renterName" placeholder="请输入">
					</div>
				</div>
        <div class="inp-item">
					<p>房源编号：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch"  type="text" v-model.trim="form.houseNo" placeholder="请输入">
					</div>
				</div>
        <div class="inp-item timeLong">
					<p>评分：</p>
					<div class="inp-box">
						<el-select filterable v-model="form.scoreStart" placeholder="请选择">
						  <el-option v-for="(item,key) in queryOption.scoreOptions" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
            至
            <el-select filterable v-model="form.scoreEnd" placeholder="请选择">
						  <el-option v-for="(item,key) in queryOption.scoreOptions" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
					</div>
				</div>
        <div class="inp-item timeLong">
					<p>评价日期：</p>
					<div class="inp-box">
						<el-date-picker :picker-options="evaluationOptionStart" v-model="form.evaluateStart" type="date" placeholder="选择日期"></el-date-picker>
						至
						<el-date-picker :picker-options="evaluationOptionEnd" v-model="form.evaluateEnd" type="date" placeholder="选择日期"></el-date-picker>
					</div>
				</div>
        <div class="inp-item pLong">
					<p>提交审核日期：</p>
					<div class="inp-box">
						<el-date-picker :picker-options="checkOptionStart" v-model="form.signDateStart" type="date" placeholder="选择日期"></el-date-picker>
						至
						<el-date-picker :picker-options="checkOptionEnd" v-model="form.signDateEnd" type="date" placeholder="选择日期"></el-date-picker>
					</div>
				</div>
        <div class="inp-item">
					<p>评价状态：</p>
					<div class="inp-box oneSelect">
						<el-select filterable v-model="form.evaluateType" placeholder="请选择">
						  <el-option v-for="(item,key) in queryOption.evaluationStateOptions" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
					</div>
				</div>
				<div class="top-btnwrap">
					<button @click="evaluationQuery" class="btn btn-primary">查询</button>
					<button @click="reset" class="btn btn-reset">重置</button>
					<button v-show="permission.indexOf('crm_evaluate_export')>-1"  class="excel_out btn btn-success f_r" @click="exportExcel">导出Excel</button>
          <!-- <a :href="host+'/evaluate/exportEvaluate'" v-show="false"></a> -->
          <!-- :href="host+'/evaluate/exportEvaluate'" -->
        </div>
			</div>

      <div class="tableContent">
    
            <div class="miniPages">
                <my-pagination :total="total" :curr="pagination.curr" :pageSize="pagination.pageSize" :pageChange="pageGo"></my-pagination>
            </div>
            <el-table :data="dataList" empty-text="暂无数据" header-row-class-name="headth" style="margin-top:20px;width:100%" v-loading="listLoading" element-loading-text="Loading" highlight-current-row>
                <el-table-column prop="renterName" label="租客姓名" >
                </el-table-column>
                <el-table-column prop="stewardName" label="所属管家" >
                </el-table-column>
                <el-table-column prop="contractNumber" label="合同编号" >
                </el-table-column>
                <el-table-column :formatter="getStatusName" label="评价状态" >
                </el-table-column>
                <el-table-column :formatter="getTypeName" label="评价类型" >
                </el-table-column>
                <el-table-column prop="serviceName" label="回访人" >
                </el-table-column>
                <el-table-column prop="auditDate"
                  label="合同审批时间">
                </el-table-column>
                <el-table-column prop="evaluateTime"
                  label="评价提交时间">
                </el-table-column>
                <el-table-column prop="evaluateScore" label="评分">
                </el-table-column>
                <el-table-column prop="evaluateContent" label="评价内容">
                </el-table-column>
                <el-table-column prop="houseName" label="操作" width="150">
                  <template slot-scope="scope" v-if="permission.indexOf('crm_evaluate_edit')>-1">
                    <el-button v-show="(scope.row.evaluateStatus == '3' && !!scope.row.gmtModified) || scope.row.evaluateStatus === '4'" icon="el-icon-edit" size="mini" @click="editEvaluation('view',scope.row)">查看评价</el-button>
                    <el-button v-show="scope.row.evaluateStatus == '3' && !scope.row.gmtModified" icon="el-icon-edit" size="mini" @click="editEvaluation('edit', scope.row)">修改评价</el-button>
                    <el-button v-show="scope.row.evaluateStatus == '2'" icon="el-icon-edit-outline" size="mini" @click="addEvaluation(scope.row)">录入评价</el-button>
                  </template>
                </el-table-column>
            </el-table>
            <div class="footPages t_r" v-if="total != 0">
                <el-pagination @current-change="pageGo" :page-size="12" :current-page="pagination.curr"  layout="prev, pager, next" :total="total"></el-pagination>
            </div>
            </div>

    </div>
    <el-dialog :close-on-click-modal="false" :visible.sync="evaluationFormVisible" width="40%" top="8%" :modal-append-to-body="false">
      <h3 slot="title" v-if="dialogState == 'add'" class="el-dialog__title">录入评价</h3>
      <h3 slot="title" v-if="dialogState == 'edit'" class="el-dialog__title">修改评价</h3>
      <div class="info-dialog">
          <div class="contractInfo">
              <h4>合同信息</h4>
              <div>
                  <div class="infoRow top">
                      <p>租客姓名</p>
                      <span>{{evaluationForm.renterName}}</span>
                      <span>{{evaluationForm.renterTel}}</span>
                  </div>
                  <div class="infoRow">
                      <p>物业地址</p>
                      <span>{{evaluationForm.houseName}}</span>
                  </div>
                  <div class="infoRow two">
                      <p>合同编号</p>
                      <span>{{evaluationForm.contractNumber}}</span>
                  </div>
                  <div class="infoRow two right">
                      <p>负责管家</p>
                      <span>{{evaluationForm.stewardName}}</span>
                      <span>（{{evaluationForm.departmentName}}）</span>
                  </div>
              </div>
          </div>
          <div class="evalInfo">
            <el-form ref="evaluationForm" :model="evaluationForm" :rules="rules2">
              <h4>评价信息</h4>
              <div class="firstRow">
                  <div class="block">
                    <el-form-item label="" ref="evaluateScoreRef" prop="evaluateScore">
                      <el-rate
                        v-model="evaluationForm.evaluateScore"
                        :disabled="dialogState === 'view'"
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']" 
                        @change="changeScore">
                      </el-rate>
                    </el-form-item>

                  </div>
                  <div class="evalScore">
                    <span>{{evaluationForm.evaluateScore || '-'}}</span>
                    <span>分</span>
                  </div>
                  <div class="evalLevl">
                    <span v-show="evaluationForm.evaluateScore == 1">非常不满意</span>
                    <span v-show="evaluationForm.evaluateScore == 2">不满意</span>
                    <span v-show="evaluationForm.evaluateScore == 3">一般</span>
                    <span v-show="evaluationForm.evaluateScore == 4">满意</span>
                    <span v-show="evaluationForm.evaluateScore == 5">非常满意</span>
                  </div>
              </div>
              <div class="twoRow">
                  <span :class="{ active: item.isActive,disabled: dialogState === 'view' }" v-for="(item,i) in formatLabels" :key="i" @click="clickSelec(item,i)">{{item.content}}</span>
              </div>
              <div class="thrRow">
                
                  <el-form-item label="" ref="evaluateContentRef" prop="evaluateContent">
                    <el-input :disabled="dialogState === 'view'"  type="textarea" :autosize="{ minRows: 3}" :maxlength= "150" :minlength="8" placeholder="请输入对管家的详细评价（8-150字）" v-model="evaluationForm.evaluateContent"></el-input>
                  </el-form-item>
                
              </div>
            </el-form>
          </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogState !== 'view'" @click="evaluationFormVisible = false">取 消</el-button>
        <el-button v-if="dialogState === 'view'" @click="evaluationFormVisible = false">确 认</el-button>
        <el-button type="primary" v-if="dialogState == 'add'" @click="saveAddEvaluation('evaluationForm')">保 存</el-button>
        <el-button type="primary" v-if="dialogState == 'edit'" @click="saveEditEvaluation('evaluationForm')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import debounce from 'lodash/debounce';
import { dateFilter } from '@/utils/date'
import { getToken } from '@/utils/auth'
const allOption = {label:'所有',value:''};
const scoreOptions = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' }
];
const evaluationStateOptions =[
  { value: 1, label: '有评价' },
  { value: 3, label: '待租客评价' },
  { value: 2, label: '待客服评价'}
]
scoreOptions.unshift(allOption);
evaluationStateOptions.unshift(allOption);
export default {
  name: 'evaluation',
  data() {
    var validateNumb = (rule,value,callback) => {
        if (!value) {
          return callback(new Error('评论不能为空')); 
        }else if(value.length<8){
          callback(new Error('至少输入8个字符！'));
        }else if(value.length>150){
          callback(new Error('输入不能超过150个字符！'));
        }else{
          callback()
        }
    };
    var validateNotEmpty = (rule, value, cb) => {
      if(!value) {
        return cb(new Error('评分不能为空！'))
      }
      cb()
    }
    return {
      listLoading:false,
      evaluateStatuObj: {
        2:'待客服评价',
        1:'待租客评价',
        4:'已评价',//租客录入
        3:'已评价' //客服录入
      },
      num1:8,
      num2:120,
      queryOption:{
        scoreOptions:scoreOptions,
        evaluationStateOptions:evaluationStateOptions
      },
      evaluationOptionEnd: {
	        disabledDate:(time) => {
	         	let boardDateStart = this.form.evaluateStart;
	         	if (!!boardDateStart) {
	         		return time.getTime()< boardDateStart;
	         	}  	
	        }
      },
      evaluationOptionStart: {
            disabledDate:(time) => {
              let boardDateEnd = this.form.evaluateEnd;
              if (!!boardDateEnd) {
                return time.getTime() > boardDateEnd;
              }  	
            }
      },
      checkOptionEnd: {
            disabledDate:(time) => {
              let boardDateStart = this.form.signDateStart;
              if (!!boardDateStart) {
                return time.getTime() < boardDateStart;
              }  	
            }
      },
      checkOptionStart: {
            disabledDate:(time) => {
              let boardDateEnd = this.form.signDateEnd;
              if (!!boardDateEnd) {
                return time.getTime() > boardDateEnd;
              }  	
            }
      },
      form:{
        contractNumber:'',
        stewardName:'',
        renterName:'',
        houseNo:'',
        scoreStart:'',
        scoreEnd:'',
        evaluateStart:'',
        evaluateEnd:'',
        signDateStart:'',
        signDateEnd:'',
        evaluateType:'',
      },
      formQuery:{
        contractNumber:'',
        stewardName:'',
        renterName:'',
        houseNo:'',
        scoreStart:'',
        scoreEnd:'',
        evaluateStart:'',
        evaluateEnd:'',
        signDateStart:'',
        signDateEnd:'',
        evaluateType:'',
		  },
      pagination:{
        pageSize:12,
        curr:1,
      },
      dialogState:'add',
      evaluationFormVisible: false,
      evaluationForm:{
        renterName: '',
        renterTel: '',
        stewardName: '',
        departmentName: '',
        contractNumber: '',
        houseName: '',
        evaluateTime: '',
        evaluateStatus: '',
        evaluateContent: '',
        evaluateLabel: [],
        evaluateScore: '',
        evaluateLabelList: '',
        id: '',
        contractId: '',
        selectLabel:[]
      },
      originalScore:'',
      rules2: {
        evaluateContent: [
            { validator: validateNumb, trigger: 'change' }
        ],
        evaluateScore: [
          { validator: validateNotEmpty, trigger: 'blur' }
        ]
      },
      formatLabels:[]
    }
  },
  computed: {
     ...mapGetters({
       dataList:'all',
       total: 'total',
       label: 'label',
       permission: 'permission',
       sidebar: 'sidebar'
     }),
     timeLabel(){
      var item = this.dataList[0],
          dataList = this.dataList;
      var source = '';
      if(dataList.length && dataList.length>0){
        source = '(' + (item.evaluateStatus == 3 ? '客服录入' : (item.evaluateStatus == 4 ? '租客评价' : '无')) + ')'
      }
      return '评价时间：' + source;
     }
  },
  watch:{
    'label':{
      imdediate:true,
      deep:true,
      handler(){
        var arr =[];
        this.label.map((item, index) => {
          arr.push({
            content: item,
            key: index,
            isActive:false
          })
        });
        this.formatLabels = arr;
      }
    },
    'evaluationForm.evaluateLabel':{
        handler(str){
          for(let i =0; i< 5; i+=2){
            var num = str[i] - 0;
            // formatLabels中对应项索引
            var index = i/2;
            this.formatLabels[index].isActive = !!num;
          }

        }
    },
  },
  methods:{
    ...mapActions({
      getEvaluationList:'GetEvaluation',
      getEvaluateLabel:'GetEvaluateLabel',
      mergeEvaluate: 'MergeEvaluate',
      saveEvaluate: 'SaveEvaluate',
      exportEvaluate: 'ExportEvaluate'
		}),
    getStatusName(row, column){
      var key = row.evaluateStatus;
      return this.evaluateStatuObj[key];
    },
    getTypeName(row, column) {
      var key = row.evaluateStatus;
      if(key === '4') {
        return '租客评价'
      } else if(key === '3') {
        return '客服回访'
      } else {
        return '---'
      }
    },
    keydownSearch(){
			this.evaluationQuery();
    },
    paginationReq(){

      this.listLoading = true;
			var data=JSON.parse(JSON.stringify(this.formQuery));
			data['pageSize']=this.pagination.pageSize;
			data['pageIndex'] = this.pagination.curr;
      data['evaluateStart'] = dateFilter(this.form.evaluateStart);
      data['evaluateEnd'] = dateFilter(this.form.evaluateEnd);
      data['signDateStart'] = dateFilter(this.form.signDateStart);
      data['signDateEnd'] = dateFilter(this.form.signDateEnd);
			this.getEvaluationList(data).finally( () => {
        this.listLoading = false;
      });
    },
    pageGo(curr){
			if(this.pagination.curr===curr){
				return;
			}
			this.pagination.curr=curr;
			this.paginationReq();
		},
    evaluationQuery:debounce(function(){
			this.pagination.curr=1;
			this.formQuery=JSON.parse(JSON.stringify(this.form));
			this.paginationReq();
		},300),
    reset:debounce(function(){
			for(let i in this.form){
				if(typeof this.form[i] ==='object'){
          this.form[i] ='';
					for(let g in this.form[i]){
						this.form[i][g]=''
					}
					continue;
				}
				this.form[i]='';

			}
			this.pagination.curr=1;
      this.formQuery=JSON.parse(JSON.stringify(this.form));
			this.paginationReq();
    },300),
    addEvaluation(item){
      this.dialogState = 'add';
      this.evaluationFormVisible = true;
      // var arry1 = [];
      // for(var j=0;j<this.label[1].datas.length;j++){
      //   arry1[j] = {};
      //   for (var key in this.label[1].datas[j]) {
      //     arry1[j][key] = this.label[1].datas[j][key];
      //   }
      // }
      // var arry2 = [];
      // for(var j=0;j<this.label[0].datas.length;j++){
      //   arry2[j] = {};
      //   for (var key in this.label[0].datas[j]) {
      //     arry2[j][key] = this.label[0].datas[j][key];
      //   }
      // }
      this.evaluationForm ={
        renterName: item.renterName,
        renterTel: item.renterTel,
        stewardName: item.stewardName,
        departmentName: item.departmentName,
        contractNumber: item.contractNumber,
        houseName: item.houseName,
        evaluateTime: item.evaluateTime,
        evaluateStatus: item.evaluateStatus,
        evaluateContent: item.evaluateContent,
        evaluateLabel: '0,0,0',
        evaluateScore: item.evaluateScore && Number(item.evaluateScore),
        evaluateLabelList: item.evaluateLabelList,
        id: item.id,
        contractId: item.contractId,
        selectLabel:[]
      }
      this.originalScore = 0;
      // 清除详细评价切换出现警告的问题
      setTimeout(() => {
        this.$refs['evaluationForm'].clearValidate();
      })
      
    },
    editEvaluation(type,item){
      this.dialogState = type;
      this.evaluationFormVisible = true;
      var arr = [];
      // for(var i=0;i<arr.length;i++){
      //   arr[i].isActive = true;
      // }

      this.evaluationForm = {
        renterName: item.renterName,
        renterTel: item.renterTel,
        stewardName: item.stewardName,
        departmentName: item.departmentName,
        contractNumber: item.contractNumber,
        houseName: item.houseName,
        evaluateTime: item.evaluateTime,
        evaluateStatus: item.evaluateStatus,
        evaluateContent: item.evaluateContent,
        evaluateLabel: item.evaluateLabel || '0,0,0',
        evaluateScore: item.evaluateScore && Number(item.evaluateScore),
        evaluateLabelList: item.evaluateLabelList,
        id: item.id,
        contractId: item.contractId,
        selectLabel:arr
      }
      this.originalScore = this.evaluationForm.evaluateScore;

      // 清除详细评价切换出现警告的问题
      setTimeout(() => {
        this.$refs['evaluationForm'].clearValidate();
      })
    },
    changeScore(score){
      // 验证 el-rate不能触发validate的change，导致修改评分验证错误信息不能消去 问题
      this.$refs['evaluateScoreRef'].clearValidate();
    },
    clickSelec(item,i){
      if(this.dialogState === 'view') return;
      item.isActive = !item.isActive;
      var strArr = this.evaluationForm.evaluateLabel.split(',');
      strArr[i] = item.isActive ? '1' : '0';
      var result = strArr.join();
      this.evaluationForm.evaluateLabel = result;
    },
    saveAddEvaluation(evaluationForm){
      this.$refs[evaluationForm].validate((valid) => {
        if (valid) {
          var param ={};
          param.contractId = this.evaluationForm.contractId;
          param.evaluateContent = this.evaluationForm.evaluateContent;
          param.evaluateScore = this.evaluationForm.evaluateScore;
          param.evaluateLabel = this.evaluationForm.evaluateLabel;
          this.saveEvaluate(param).then(() => {
            this.paginationReq();
          });
          this.evaluationFormVisible = false;
        } else {
          return false;
        }
      });
    },
    saveEditEvaluation(evaluationForm){
      this.$refs[evaluationForm].validate(valid => {
        if (valid) {
          var param ={};
          param.contractId = this.evaluationForm.contractId;
          param.evaluateContent = this.evaluationForm.evaluateContent;
          param.evaluateScore = this.evaluationForm.evaluateScore;
          param.evaluateLabel = this.evaluationForm.evaluateLabel;
          param.id = this.evaluationForm.id;

          this.mergeEvaluate(param).then(() => {
            this.paginationReq();
          });
          this.evaluationFormVisible = false;
        } else {
          return false;
        }
      });
    },
    exportExcel(){
      var s1 = this.form.signDateStart;
      var s2 = this.form.signDateEnd;
      var total = (s2 - s1)/1000;
      var day = parseInt(total / (24*60*60));//计算整数天数
      if(!s1){
        this.$message({
          message: "请选择提交审核日期",
          type: 'warning'
        })
        return
      }
      if(!s2){
        this.$message({
          message: "请选择提交审核日期",
          type: 'warning'
        })
        return
      }
      if(day>30){
        this.$message({
          message: "导出表格的提交审核日期时间段最长30天",
          type: 'warning'
        })
        return
      }
      var data=JSON.parse(JSON.stringify(this.formQuery));
			data['pageSize']=this.pagination.pageSize;
			data['pageIndex'] = this.pagination.curr;
      data['evaluateStart'] = dateFilter(this.form.evaluateStart);
      data['evaluateEnd'] = dateFilter(this.form.evaluateEnd);
      data['signDateStart'] = dateFilter(this.form.signDateStart);
      data['signDateEnd'] = dateFilter(this.form.signDateEnd);
      data['token'] = getToken();
      function createURL (url,param){
          var myURL = {link:''};
          for(var key in param){
              var link = '&' + key + "=" + param[key];
              myURL.link += link;
          }
          myURL.link = url + "?" + myURL.link.substr(1);
          return myURL.link.replace(' ','');
      }
      location.href = createURL(this.host+'/evaluate/exportEvaluate',data)
    }
  },
  beforeMount(){
    // 获取 labels
    this.getEvaluateLabel();
    //proGroup
    this.paginationReq();
    
  },
  mounted:function () {
    
  },
  beforeDestroy(){
    this.listLoading = false;
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #evaluation{
    height: 100%;
  }
  .evaluation-content{
		position: relative;
    // width: 1683px;
    // &.longWidth{
    //   width: 1813px;
    // }
	}
  .evaluation-content .form-box{
		margin-bottom: 15px;
		padding-top: 15px;
    padding-left: 15px;
		background-color: #fff;
	}
	.evaluation-content .inp-item {
		width: 24.4%;
		display: inline-block;
		margin-top: 0;
		padding-bottom:15px;
	}
	.evaluation-content .inp-item.timeLong{
		width: 49%;
	}
	.inp-item.timeLong div.el-date-editor.el-input{
		width: 45%
	}
	.evaluation-content .inp-item.multiple-sel{
		min-width: 360px;
	}

	.evaluation-content .inp-item>p{
		float: left;
		width: 95px;
		line-height: 36px;
		padding-left: 15px;
		height: 36px;
		color: #576578;
	}
	.evaluation-content .inp-item.middle>p{
		width: 85px;
	}
	.evaluation-content .inp-item .inp-box{
		margin-left: 95px;
		margin-right: 15px;
	}
  .evaluation-content .inp-item .inp-box .el-select{
    width: 45%;
  }
	.evaluation-content .inp-item.middle .inp-box{
		margin-left: 105px;
	}
  .top-btnwrap{
		padding-left:95px;
		padding-bottom: 15px;

	}
	.top-btnwrap button:nth-child(1){
		margin-right: 15px;
	}
  .excel_out{margin-right: 15px;}
  .evaluation-content .inp-item.pLong{
    width: 49%;
  }
  .evaluation-content .inp-item.pLong>p{
		width: 120px;
  }
  .evaluation-content .inp-item.pLong .inp-box{
		margin-left: 125px;
		margin-right: 15px;
  }
  .inp-item.pLong div.el-date-editor.el-input{
		width: 45%
  }
  .evaluation-content .inp-item .inp-box.oneSelect .el-select{
    width: 100%;
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .dataBox .toolBar {
        padding: 0 0 10px 0;
        border-bottom: 1px solid #F1F1F1;
    }
    .evaluation-item{
      padding: 16px 20px 20px 20px;
      border-bottom: 1px solid #F1F1F1;
    }
    .evaluation-item:hover{
      background: #F9FAFC;
    }
    .evaluation-item .info-item {
      display: inline-block;
      margin-top: 0;
      vertical-align: middle;
    }
    .evaluation-item .info-item.oneItem{
      width: 13%;
    }
    .evaluation-item .info-item.twoItem{
      width: 14%;
    }
    .evaluation-item .info-item.thrItem{
      width: 15%;
    }
    .evaluation-item .info-item.fourItem{
      width: 28%;
    }
    .evaluation-item .info-item.fourItem .info-box{
      margin-left: 19%;
      width: 80%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow:ellipsis;
    }
    .evaluation-item .info-item.fivItem{
      width: 25%;
    }
    .evaluation-item .info-item>p{
      float: left;
      line-height: 36px;
      padding-left: 15px;
      height: 36px;
      color: #A3B2C6;
    }
    .evaluation-item .info-item .info-box{
      line-height: 36px;
      height: 36px;
      width: 152px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow:ellipsis;
    }
    .evaluation-item .itemBottom .left{
      display: inline-block;
    }
    .evaluation-item .itemBottom .left .evaluation-info>p{
      display: inline-block;
      line-height: 36px;
      padding-left: 15px;
      height: 36px;
      color: #A3B2C6;
    }
    .evaluation-item .itemBottom .left .evaluation-info .info-box{
      display: inline-block;  
      line-height: 36px;
      height: 36px;
      color: #A3B2C6;
    }
    .evaluation-item .itemBottom .left .evaluation-select{
      margin-left: 15px;
      margin-top: 5px;
      height: 26px;
    }
    .evaluation-item .itemBottom .left .evaluation-select>span{
      display: inline-block;  
      height: 26px;
      line-height: 26px;
      padding: 0 10px;
      border: 1px solid #FFE4B7;
      border-radius: 2px;
      color: #F7BC5A;
      font-size: 12px;
      margin-right: 15px;
      vertical-align: middle;
    }
    .evaluation-item .itemBottom .right{
      float: right;
    }
    .evaluation-item .itemBottom .right .evalScore{
      margin: 10px 80px 0 0;
    }
    .evaluation-item .itemBottom .right .evalScore>span:nth-child(1){
      font-family: MicrosoftYaHei;
      font-size: 14px;
      color: #D1D1D1;
    }
    .evaluation-item .itemBottom .right .evalScore>span:nth-child(2){
      font-family: HelveticaNeue;
      font-size: 26px;
      color: #F5A623;
    }
    .evaluation-item .itemBottom .right .evalScore>span:nth-child(3){
      font-family: HelveticaNeue;
      font-size: 14px;
      color: #F5A623;
    }
    .evaluation-item .itemBottom .rightButton{
      float: right;
    }
    .evaluation-item .itemBottom .rightButton>button{
      margin: 8px 20px 0 0;
    }

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    .info-dialog{
      padding: 0 30px;
    }
    .info-dialog .contractInfo>h4{
      font-family: MicrosoftYaHei-Bold;
      font-size: 14px;
      color: #333333;
      height: 50px;
      line-height: 38px;
      padding-bottom: 12px;
      border-bottom: 1px solid #EFEFEF;
    }
    .info-dialog .contractInfo>div{
      border-bottom: 1px solid #EFEFEF;
      padding-bottom: 10px;
    }
    .info-dialog .contractInfo .infoRow {
      margin-top: 0;
      vertical-align: middle;
    }
    .info-dialog .contractInfo .infoRow.top{
      margin-top: 10px;
    }
    .info-dialog .contractInfo .infoRow.top>span:nth-child(2){
      font-family: MicrosoftYaHei-Bold;
      font-size: 18px;
      color: #576578;
      font-weight: 600;
    }
    .info-dialog .contractInfo .infoRow.top>span:nth-child(3){
      margin-left: 10px;
    }
    .info-dialog .contractInfo .infoRow.two{
      display: inline-block;
    }
    .info-dialog .contractInfo .infoRow.two.right{
      float: right;
    }
    .info-dialog .contractInfo .infoRow>p{
      display: inline-block;
      line-height: 36px;
      padding-right: 10px;
      height: 36px;
      color: #A3B2C6;
    }
    .info-dialog .evalInfo>h4{
      font-family: MicrosoftYaHei-Bold;
      font-size: 14px;
      color: #333333;
      height: 50px;
      line-height: 38px;
      padding: 12px 0 0 0;
    }
    .info-dialog .firstRow .block{
      display: inline-block;
    }
    .info-dialog .firstRow .evalScore{
      display: inline-block;
      margin: 10px;
    }
    .info-dialog .firstRow .evalScore>span:nth-child(1){
      font-family: HelveticaNeue;
      font-size: 24px;
      color: #F5A623;
    }
    .info-dialog .firstRow .evalScore>span:nth-child(2){
      font-family: MicrosoftYaHei;
      font-size: 18px;
      color: #F5A623;
    }
    .info-dialog .firstRow .evalLevl{
      display: inline-block;
    }
    .info-dialog .firstRow .evalLevl>span{
      font-family: MicrosoftYaHei;
      font-size: 18px;
      color: #F5A623;
    }
    .info-dialog .evalInfo .twoRow{
      margin: 5px 0;
    }
    .info-dialog .evalInfo .twoRow>span{
      display: inline-block;  
      height: 26px;
      line-height: 26px;
      padding: 0 10px;
      border: 1px solid #EFEFEF;
      border-radius: 2px;
      color: #999;
      font-size: 12px;
      margin-right: 15px;
      margin-bottom: 15px;
      cursor: pointer;
    }
    .info-dialog .evalInfo .twoRow>span:hover{
      border: 1px solid #FFE4B7;
      color: #F7BC5A;
    }
    .info-dialog .evalInfo .twoRow>span.active{
      border: 1px solid #FFE4B7;
      color: #F7BC5A;
    }
    .tableContent{
      background-color:#fff;
    }
    .el-button+.el-button {
      margin-left: 0; 
    }
</style>
