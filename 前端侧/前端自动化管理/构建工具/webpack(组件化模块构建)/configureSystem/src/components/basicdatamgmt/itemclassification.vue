<template>
  <div id="itemclassification" class="itemclassification">
    <div class="main-content">
      <div class="header-wrap btn-wrap clearfix">
        <h3 class="header">物品分类管理</h3>
      </div>

      <el-tree :data="tree" :props="defaultProps" node-key="id" default-expand-all :highlight-current="true" :indent="20" :expand-on-click-node="true" :render-content="renderContent">
      </el-tree>
    </div>

    <el-dialog :close-on-click-modal="false" :visible.sync="renameFormVisible" top="30%" class="categoryDialog" @close="beforeClose('renameForm')">
      <h3 slot="title" class="el-dialog__title">重命名</h3>
      <el-form :model="renameForm" :rules="nameRules" ref="renameForm" label-width="80px">
        <el-form-item label="分类名称:" prop="sortName">
          <el-input placeholder="请输入" v-model="renameForm.sortName" required="true" type="text"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="renameFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRename">保 存</el-button>
      </div>
    </el-dialog>

    <el-dialog :close-on-click-modal="false" :visible.sync="newItemFormVisible" top="30%" class="categoryDialog" @close="beforeClose('newItemForm')">
      <h3 slot="title" class="el-dialog__title">创建子分类</h3>
      <el-form :model="newItemForm" :rules="nameRules" ref="newItemForm" label-width="80px">
        <el-form-item label="所属分类:">
          <el-input placeholder="请输入" v-model="newItemForm.parent" disabled type="text"></el-input>
        </el-form-item>

        <el-form-item label="分类名称:" prop="sortName">
          <el-input placeholder="请输入" v-model="newItemForm.sortName" required="true" type="text"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newItemFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveNewItem">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'itemclassification',
  data() {
    return {
      renameFormVisible: false,
      newItemFormVisible: false,
      renameForm: {},
      newItemForm: {},
      nameRules: {
        sortName: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      defaultProps: {
        children: 'children',
        label: 'sortName'
      }
    }
  },
  computed: {
    ...mapGetters({
      tree: 'tree'
    })
  },
  methods: {
    ...mapActions([
      'getAllCategory',
      'add3rdCategory',
      'edit3rdCategory',
      'operCategory',
      'deleteCategory'
    ]),
    beforeClose(formName) {
      setTimeout(() => {
        this.$refs[formName].resetFields()
      }, 300)
    },
    append(data) {
      this.newItemFormVisible = true
      this.newItemForm = {}
      this.newItemForm.parent = data.sortName
      this.newItemForm.id = data.id
    },
    rename(data) {
      this.renameForm = {
        pkId: data.id,
        sortName: data.sortName,
        isUse: data.isUse,
        pid: data.pid,
        classifyNumber: data.classifyNumber,
        classifyRank: data.classifyRank
      }
      this.renameFormVisible = true
    },
    oper(isUse, id) {
      const type = isUse ? ['stop', '停用'] : ['open', '启用']
      if (isUse) {
        this.confirm(type, id, this.operCategory)
      } else {
        this.operCategory({ operType: type[0], id })
      }
    },
    delete(id) {
      const type = ['delete', '删除']
      this.confirm(type, id, this.deleteCategory)
    },
    confirm(type, id, cb) {
      this.$confirm(`此操作将${type[1]}该分类，是否继续？`, `${type[1]}分类`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          cb({ operType: type[0], id })
        })
        .catch(() => {})
    },
    saveRename() {
      this.$refs['renameForm'].validate(valid => {
        if (valid) {
          this.edit3rdCategory(this.renameForm).then(() => {
            this.renameFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    saveNewItem() {
      this.$refs['newItemForm'].validate(valid => {
        if (valid) {
          this.add3rdCategory({
            pid: this.newItemForm.id,
            sortName: this.newItemForm.sortName,
            classifyRank: 3
          })
          this.newItemFormVisible = false
        } else {
          return false
        }
      })
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <span>
            <span class={{ 'label-disabled': !data.isUse }}>{node.label}</span>
            {!data.isUse && <span class="is-not-used">-已停用</span>}
          </span>
          <span class="operHandle">
            <img src="./static/images/wpflzk.png" class="operHandleImg" />
            <ul class="operating">
              {node.level === 2 && (
                <li class="first-li">
                  <el-button
                    type="text"
                    size="small"
                    on-click={() => this.append(data)}
                  >
                    创建子分类
                  </el-button>
                </li>
              )}
              {node.level === 3 && (
                <li>
                  <el-button
                    type="text"
                    size="small"
                    on-click={() => this.rename(data)}
                  >
                    重命名
                  </el-button>
                </li>
              )}
              <li>
                <el-button
                  type="text"
                  size="small"
                  on-click={() => this.oper(data.isUse, data.id)}
                >
                  {data.isUse ? '停用' : '启用'}此分类
                </el-button>
              </li>
              {node.level === 3 &&
                !data.isUse && (
                  <li>
                    <el-button
                      type="text"
                      size="small"
                      on-click={() => this.delete(data.id)}
                    >
                      删除此分类
                    </el-button>
                  </li>
                )}
            </ul>
          </span>
        </span>
      )
    }
  },
  created() {
    this.getAllCategory()
  }
}
</script>
<style>
.categoryDialog .el-dialog {
  width: 460px;
}
.categoryDialog .el-dialog__body {
  padding: 30px 50px;
}
.categoryDialog .el-form-item.is-required .el-form-item__label:before {
  content: '';
}

.itemclassification .el-tree {
  border: 0;
  padding-left: 20px;
  width: 300px;
  padding-top: 20px;
}

.itemclassification .el-tree .el-tree-node__content {
  height: 26px;
  line-height: 26px;
  position: relative;
}

.itemclassification .el-tree-node.is-expanded>.el-tree-node__children {
  overflow: visible !important;
}

#itemclassification .collapse-transition{
  overflow: hidden !important;
}

.operHandle {
  position: absolute;
  right: 10px;
}
.operHandle .el-button {
  background-color: #fff;
}
.label-disabled {
  color: #c5c5c5;
}
.is-not-used {
  font-size: 12px;
  padding-left: 5px;
  color: #f14b4b;
}
.operHandleImg {
  display: none;
}
.el-tree-node__content:hover .operHandleImg {
  display: inline-block;
}

.operHandle:hover .operating {
  display: block;
}

.operating {
  z-index: 1000;
  position: absolute;
  display: none;
  top: 26px;
  left: -16px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 3px;
  font-size: 12px;
  /* text-align: center; */
  background: #fff;
}
.operating li {
  line-height: 30px;
  padding: 0 16px;
}
.operating li.first-li {
  border-bottom: 1px solid #f1f1f1;
  margin-bottom: 5px;
}
.operating > div {
  padding-bottom: 5px;
  padding-top: 5px;
}

.operating .el-button--text,
.operating .el-button--text:hover {
  color: #666;
}
</style>
<style scoped>
#itemclassification {
  height: 100%;
}
.main-content {
  width: 100%;
  min-height: 100%;
  background-color: #fff;
  box-sizing: border-box;
  padding-bottom: 40px;
}
.header-wrap {
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f6f8f8;
}
.header {
  padding-left: 30px;
  border-left: 3px solid #3ca0ff;
}
</style>