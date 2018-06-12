<template>
  <div id="itemdetails">
    <div style="background: #fff;margin-bottom: 10px;padding: 20px 30px;">
      <ul class="detail-title">
        <li>
          <p style="color: #a3b2c6;">物品编码</p>
          <p style="font-size: 18px;font-weight: 600;margin-top: 10px;">{{goodsDetail.proNumber}}</p>
        </li>
        <li>
          <p style="color: #a3b2c6; ">物品名称</p>
          <p style="font-size: 18px;font-weight: 600;margin-top: 10px; ">{{goodsDetail.proName}}</p>
        </li>
        <li>
          <p style="color: #a3b2c6;">状态</p>
          <p style="font-size: 18px;font-weight: 600;margin-top: 10px;">{{goodsDetail.status == '1' ? '使用中':'已停用'}}</p>
        </li>
        <li>
          <p style="color: #a3b2c6; ">生效日期</p>
          <p style="font-size: 18px;font-weight: 600;margin-top: 10px; ">{{goodsDetail.startDate | toDate}}</p>
        </li>
        <li>
          <p style="color: #a3b2c6;">失效日期</p>
          <p style="font-size: 18px;font-weight: 600;margin-top: 10px;">{{goodsDetail.endDate | toDate}}</p>
        </li>
      </ul>
    </div>
    <!--房源详情选项卡 begin-->
    <div class="room-tabs">
      <ul>
        <li v-if="goodsDetail.proNatureValue=='0'">
          <a v-bind:class="(isActive==0)?'cur':''" @click="selectTabs(0)" href="#">配件关系</a>
        </li>
        <li v-if="goodsDetail.proNatureValue=='0'">
          <a v-bind:class="(isActive==1)?'cur':''" @click="selectTabs(1)" href="#">组装费关系</a>
        </li>
        <li>
          <a v-bind:class="(isActive==2)?'cur':''" @click="selectTabs(2)" href="#">价格管理</a>
        </li>
      </ul>
    </div>
    <!--房源详情选项卡 end-->
    <!--数据列表0 begin-->
    <div class="dataBox" v-bind:class="(isActive=='0')?'showit':'hideit'">
      <div style="margin-bottom: 20px;">
        <input type="button" class="addBtn" @click="addRelationship(0)" value="+ 添加配件关系" />
        <ul class="total">
          <li :class="{'active': pagination0.state === 'none'}" @click="stateClick('none')">全部（
            <span>{{allTotal0[0]}}</span>）</li>
          <i style="height: 15px;width: 1px;display: inline-block;background-color: #999;vertical-align: middle;margin: 0 10px;"></i>
          <li :class="{'active': pagination0.state === 'open'}" @click="stateClick('open')">使用中（
            <span>{{allTotal0[1]}}</span>）</li>
          <i style="height: 15px;width: 1px;display: inline-block;background-color: #999;vertical-align: middle;margin: 0 10px;"></i>
          <li :class="{'active': pagination0.state === 'stop'}" @click="stateClick('stop')">已停用（
            <span>{{allTotal0[2]}}</span>）</li>
        </ul>
      </div>
      <div class="tableBox">
        <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th>序号</th>
            <th>配件名称</th>
            <th>状态</th>
            <th>适用性</th>
            <th>默认数量</th>
            <th>生效日期</th>
            <th>失效日期</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in accessoriesGroup" :key="index">
            <td>{{(pagination0.curr-1)*pagination0.pageSize+index+1}}</td>
            <td>{{item.proName}}</td>
            <td>{{item.status ? '使用中' : '已停用'}}</td>
            <td>{{item.applyto}}</td>
            <td>{{item.number}}</td>
            <td>{{item.effectivedate | toDate}}</td>
            <td>{{item.expirydate | toDate}}</td>
            <td>
              <p class="typeControl">
                <a href="javascript:void(0)" class="d-btn" @click="operItem(0, item, 'none')">
                  <i></i>删除</a>
                <a href="javascript:void(0)" class="e-btn" @click="operItem(0, item, 'edit')">
                  <i></i>编辑</a>
                <a v-if="item.status === 1" href="javascript:void(0)" class="t-btn" @click="operItem(0, item, 'stop')">
                  <i></i>停用</a>
                <a v-if="item.status === 0" href="javascript:void(0)" class="q-btn" @click="operItem(0, item, 'open')">
                  <i></i>启用</a>

              </p>
            </td>
          </tr>
        </table>
      </div>
      <div class="footPages">
        <el-pagination @current-change="changecurrent" :current-page.sync="pagination0.curr" layout="prev, pager, next" :total="allTotal0[STATE[pagination0.state]]"></el-pagination>
      </div>
    </div>
    <!--数据列表0 end-->
    <!--新增物品与配件关系 begin-->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible0" size="small" top="30%" class="dialog0" @close="beforeClose(0)" @open="beforeOpen(0)">
      <h3 slot="title" v-if="dialogState0 == 'add'" class="el-dialog__title">添加物品与配件关系
        <span class="tiptit">
          <i>*</i>为必填项</span>
      </h3>
      <h3 slot="title" v-if="dialogState0 == 'edit'" class="el-dialog__title">编辑物品与配件关系
        <span class="tiptit">
          <i>*</i>为必填项</span>
      </h3>
      <el-form :model="itemForm0" ref="itemForm0" class="tworowForm" :rules="rules01">
        <el-form-item label="配件：" prop="accessorName">
          <el-select v-model="itemForm0.accessorName" filterable placeholder="请选择">
            <el-option v-for="item in accessorNameOptions" :key="item.pkId" :label="item.goodsName" :value="item.pkId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认数量：" prop="defaultNum">
          <el-input v-model.number="itemForm0.defaultNum"></el-input>
        </el-form-item>
        <el-form-item label="生效日期:" prop="startDateValue">
          <el-date-picker v-model="itemForm0.startDateValue" type="date" :editable="false" placeholder="请选择日期" :picker-options="pickerOptionStart0">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效日期:" prop="endDateValue">
          <el-date-picker v-model="itemForm0.endDateValue" type="date" :editable="false" placeholder="请选择日期" :picker-options="pickerOptionEnd0">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="适用性：" prop="applyto" class="versionNum">
          <el-input v-model="itemForm0.applyto" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="beforeClose(0)">取 消</el-button>
        <el-button type="primary" v-if="dialogState0 == 'add'" @click="saveAddSupplier(0)">确 定</el-button>
        <el-button type="primary" v-if="dialogState0 == 'edit'" @click="saveEditSupplier(0)">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增物品与配件关系 end-->

    <!--数据列表1 begin-->
    <div class="dataBox" v-bind:class="(isActive=='1')?'showit':'hideit'">
      <div style="margin-bottom: 20px;">
        <input type="button" class="addBtn" @click="addRelationship(1)" value="+ 添加组装费关系" />
        <ul class="total">
          <li :class="{'active': pagination1.state === 'none'}" @click="stateClick('none')">全部（
            <span>{{allTotal1[0]}}</span>）</li>
          <i style="height: 15px;width: 1px;display: inline-block;background-color: #999;vertical-align: middle;margin: 0 10px;"></i>
          <li :class="{'active': pagination1.state === 'open'}" @click="stateClick('open')">使用中（
            <span>{{allTotal1[1]}}</span>）</li>
          <i style="height: 15px;width: 1px;display: inline-block;background-color: #999;vertical-align: middle;margin: 0 10px;"></i>
          <li :class="{'active': pagination1.state === 'stop'}" @click="stateClick('stop')">已停用（
            <span>{{allTotal1[2]}}</span>）</li>
        </ul>
      </div>
      <div class="tableBox">
        <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th>序号</th>
            <th>组装费名称</th>
            <th>状态</th>
            <th>默认数量</th>
            <th>生效日期</th>
            <th>失效日期</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in assemblyGroup" :key="index">
            <td>{{(pagination1.curr-1)*pagination1.pageSize+index+1}}</td>
            <td>{{item.proName}}</td>
            <td>{{item.status ? '使用中' : '已停用'}}</td>
            <td>{{item.number}}</td>
            <td>{{item.effectivedate | toDate}}</td>
            <td>{{item.expirydate | toDate}}</td>
            <td>
              <p class="typeControl">
                <a href="javascript:void(0)" class="d-btn" @click="operItem(1, item, 'none')">
                  <i></i>删除</a>
                <a href="javascript:void(0)" class="e-btn" @click="operItem(1, item, 'edit')">
                  <i></i>编辑</a>
                <a v-if="item.status === 1" href="javascript:void(0)" class="t-btn" @click="operItem(1, item, 'stop')">
                  <i></i>停用</a>
                <a v-if="item.status === 0" href="javascript:void(0)" class="q-btn" @click="operItem(1, item, 'open')">
                  <i></i>启用</a>
              </p>
            </td>
          </tr>
        </table>
      </div>
      <div class="footPages">
        <el-pagination @current-change="changecurrent" :current-page.sync="pagination1.curr" layout="prev, pager, next" :total="allTotal1[STATE[pagination1.state]]"></el-pagination>
      </div>
    </div>
    <!--数据列表1 end-->
    <!--新增物品与组装费关系 begin-->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible1" size="small" top="30%" class="dialog1" @close="beforeClose(1)" @open="beforeOpen(1)">
      <h3 slot="title" v-if="dialogState1 == 'add'" class="el-dialog__title">添加物品与组装费关系
        <span class="tiptit">
          <i>*</i>为必填项</span>
      </h3>
      <h3 slot="title" v-if="dialogState1 == 'edit'" class="el-dialog__title">编辑物品与组装费关系
        <span class="tiptit">
          <i>*</i>为必填项</span>
      </h3>
      <el-form :model="itemForm1" ref="itemForm1" class="tworowForm" :rules="rules01">
        <el-form-item label="组装费：" prop="assemblyName">
          <el-select v-model="itemForm1.assemblyName" filterable placeholder="请选择">
            <el-option v-for="item in assemblyNameOptions" :key="item.pkId" :label="item.goodsName" :value="item.pkId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认数量：" prop="defaultNum">
          <el-input v-model.number="itemForm1.defaultNum"></el-input>
        </el-form-item>
        <el-form-item label="生效日期:" prop="startDateValue">
          <el-date-picker v-model="itemForm1.startDateValue" type="date" :editable="false" placeholder="请选择日期" :picker-options="pickerOptionStart1">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效日期:" prop="endDateValue">
          <el-date-picker v-model="itemForm1.endDateValue" type="date" :editable="false" placeholder="请选择日期" :picker-options="pickerOptionEnd1">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="适用性：" prop="applyto" class="versionNum">
          <el-input v-model="itemForm1.applyto" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="beforeClose(1)">取 消</el-button>

        <el-button type="primary" v-if="dialogState1 == 'add'" @click="saveAddSupplier(1)">确 定</el-button>
        <el-button type="primary" v-if="dialogState1 == 'edit'" @click="saveEditSupplier(1)">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增物品与组装费关系 end-->

    <!--数据列表2 begin-->
    <div class="dataBox" v-bind:class="(isActive=='2')?'showit':'hideit'">
      <div style="margin-bottom: 20px;">
        <input type="button" class="addBtn" @click="addRelationship(2)" value="+ 添加价格" />
        <ul class="total">
          <li :class="{'active': pagination2.state === 'none'}" @click="stateClick('none')">全部（
            <span>{{allTotal2[0]}}</span>）</li>
          <i style="height: 15px;width: 1px;display: inline-block;background-color: #999;vertical-align: middle;margin: 0 10px;"></i>
          <li :class="{'active': pagination2.state === 'open'}" @click="stateClick('open')">使用中（
            <span>{{allTotal2[1]}}</span>）</li>
          <i style="height: 15px;width: 1px;display: inline-block;background-color: #999;vertical-align: middle;margin: 0 10px;"></i>
          <li :class="{'active': pagination2.state === 'stop'}" @click="stateClick('stop')">已停用（
            <span>{{allTotal2[2]}}</span>）</li>
        </ul>
      </div>
      <div class="tableBox">
        <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th>序号</th>
            <th>物品价格编码</th>
            <th>状态</th>
            <th>供应商编码</th>
            <th>供应商名称</th>
            <th>单价</th>
            <th>生效日期</th>
            <th>失效日期</th>
            <th>税率</th>
            <th>结算供应商</th>
            <th>是否保修</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item,index) in priceGroup" :key="index">
            <td>{{(pagination2.curr-1)*pagination2.pageSize+index+1}}</td>
            <td>{{item.parameter1}}</td>
            <td>{{item.parameter2 ? '使用中' : '已停用'}}</td>
            <td>{{item.parameter3}}</td>
            <td>{{item.parameter4}}</td>
            <td>{{item.parameter5}}</td>
            <td>{{item.parameter6 | toDate}}</td>
            <td>{{item.parameter7 | toDate}}</td>
            <td>{{item.parameter8}}</td>
            <td>{{item.parameter9}}</td>
            <td>{{item.parameter10}}</td>
            <td>
              <p class="typeControl">
                <a href="javascript:void(0)" class="d-btn" @click="operItem(2, item, 'none')">
                  <i></i>删除</a>
                <a href="javascript:void(0)" class="e-btn" @click="operItem(2, item, 'edit')">
                  <i></i>编辑</a>
                <a v-if="item.parameter2 === 1" href="javascript:void(0)" class="t-btn" @click="operItem(2, item, 'stop')">
                  <i></i>停用</a>
                <a v-if="item.parameter2 === 0" href="javascript:void(0)" class="q-btn" @click="operItem(2, item, 'open')">
                  <i></i>启用</a>
              </p>
            </td>
          </tr>
        </table>
      </div>
      <div class="footPages">
        <el-pagination @current-change="changecurrent" :current-page.sync="pagination2.curr" layout="prev, pager, next" :total="allTotal2[STATE[pagination2.state]]"></el-pagination>
      </div>
    </div>
    <!--数据列表2 end-->
    <!--新增物品与价格管理 begin-->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible2" top="5%" class="dialog2" @close="beforeClose(2)" @open="beforeOpen(2)">
      <h3 slot="title" v-if="dialogState2 == 'add'" class="el-dialog__title">添加价格
        <span class="tiptit">
          <i>*</i>为必填项</span>
      </h3>
      <h3 slot="title" v-if="dialogState2 == 'edit'" class="el-dialog__title">修改价格
        <span class="tiptit">
          <i>*</i>为必填项</span>
      </h3>
      <el-form :model="itemForm2" ref="itemForm2" class="tworowForm" :rules="rules2">
        <el-form-item label="派单供应商：" prop="supplierName" class="content120">
          <el-select v-model="itemForm2.supplierName" filterable placeholder="请选择">
            <el-option v-for="item in supplierNameOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价：" prop="proPrice">
          <el-input v-model="itemForm2.proPrice" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="生效日期:" prop="startDateValue">
          <el-date-picker v-model="itemForm2.startDateValue" type="date" :editable="false" placeholder="请选择日期" :picker-options="pickerOptionStart2">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效日期:" prop="endDateValue">
          <el-date-picker v-model="itemForm2.endDateValue" type="date" :editable="false" placeholder="请选择日期" :picker-options="pickerOptionEnd2">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="适用性：" prop="applyto" class="versionNum">
          <el-input v-model="itemForm2.applyto" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="税率：" prop="taxRate" class="taxRate">
          <el-input v-model="itemForm2.taxRate" placeholder="请输入">
            <template slot="append">%</template>
          </el-input>
          <el-select v-model="itemForm2.taxRateWhether" placeholder="请选择">
            <el-option label="不含税" value="0"></el-option>
            <el-option label="含税" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="结算供应商：" prop="settleSupplierName" class="content120">
          <el-select v-model="itemForm2.settleSupplierName" filterable placeholder="请选择">
            <el-option v-for="item in supplierNameOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否保修：" prop="warranty">
          <el-select v-model="itemForm2.warranty" placeholder="请选择">
            <el-option label="不保修" value="0"></el-option>
            <el-option label="保修" value="1"></el-option>
          </el-select>
        </el-form-item>
        <div v-if="itemForm2.warranty == 1">
          <el-form-item label="保修月数1：" prop="warrantyMonths1">
            <el-input v-model="itemForm2.warrantyMonths1" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label=" " class="visibilhide">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="保修范围：" prop="warrantyRange1" class="oneline">
            <el-input type="textarea" :rows="4" v-model="itemForm2.warrantyRange1" :maxlength="500" placeholder="请输入（500字以内）"></el-input>
          </el-form-item>
          <el-form-item label="保修月数2：" prop="warrantyMonths2">
            <el-input v-model="itemForm2.warrantyMonths2" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label=" " class="visibilhide">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="保修范围：" prop="warrantyRange2" class="oneline">
            <el-input type="textarea" :rows="4" v-model="itemForm2.warrantyRange2" :maxlength="500" placeholder="请输入（500字以内）"></el-input>
          </el-form-item>
          <el-form-item label="保修说明：" prop="warrantyDescription" class="oneline">
            <el-input type="textarea" :rows="4" v-model="itemForm2.warrantyDescription" :maxlength="500" placeholder="请输入（500字以内）"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="beforeClose(2)">取 消</el-button>

        <el-button type="primary" v-if="dialogState2 == 'add'" @click="saveAddSupplier(2)">确 定</el-button>
        <el-button type="primary" v-if="dialogState2 == 'edit'" @click="saveEditSupplier(2)">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增物品与价格管理 end-->

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as validate from '@/utils/validate'
import {
  getGoodsRelationship,
  addGoodsRelationship,
  editGoodsRelationship,
  addGoodsPrice,
  editGoodsPrice,
  getProviders,
  operGoodsPart,
  operGoodsPrice,
  getGoodsPartDetail,
  getGoodsPriceDetail
} from '../../api/basicdatamgmt'

const ITEM_FORM = [
  {
    accessorName: '', //配件名称
    defaultNum: '', //默认数量
    startDateValue: '', //合作开始日期
    endDateValue: '', //合作结束日期
    applyto: '江寓合租V1.0' //适用性
  },
  {
    assemblyName: '', //组装名称
    defaultNum: '', //默认数量
    startDateValue: '', //合作开始日期
    endDateValue: '', //合作结束日期
    applyto: '江寓合租V1.0' //适用性
  },
  {
    supplierName: '', //派单供应商名称
    proPrice: '', //单价
    startDateValue: '', //合作开始日期
    endDateValue: '', //合作结束日期
    applyto: '江寓合租V1.0', //适用性
    taxRate: '', //税率
    taxRateWhether: '0',
    settleSupplierName: '',
    warranty: '0', //保修
    warrantyMonths1: '', //保修月数1
    warrantyRange1: '', //保修范围
    warrantyMonths2: '', //保修月数2
    warrantyRange2: '', //保修范围
    warrantyDescription: '' //保修说明
  }
]

const format = [
  _d => ({
    pkId: _d.pkId,
    goodsTypeId: _d.goodsTypeId,
    goodsId: _d.goodsId,
    accessorName: _d.goodsTypeId, //配件名称
    defaultNum: _d.defaultNumber, //默认数量
    startDateValue: new Date(1 * _d.startDate), //合作开始日期
    endDateValue: new Date(1 * _d.endDate), //合作结束日期
    applyto: _d.jrId //适用性
  }),
  _d => ({
    pkId: _d.pkId,
    goodsTypeId: _d.goodsTypeId,
    goodsId: _d.goodsId,
    assemblyName: _d.goodsTypeId, //组装名称
    defaultNum: _d.defaultNumber, //默认数量
    startDateValue: new Date(1 * _d.startDate), //合作开始日期
    endDateValue: new Date(1 * _d.endDate), //合作结束日期
    applyto: _d.jrId //适用性
  }),
  _d => ({
    pkId: _d.pkId,
    supplierName: _d.proName,
    proId: _d.proId,
    proPrice: _d.cost + '',
    startDateValue: new Date(1 * _d.startDate),
    endDateValue: new Date(1 * _d.endDate),
    applyto: '江寓合租V1.0',
    taxRate: _d.rate + '', //税率
    taxRateWhether: _d.isRate + '',
    settleSupplierName: _d.anSupplierName,
    anProId: _d.anProId,
    warranty: _d.isRepair + '', //保修
    warrantyMonths1: _d.repair && _d.repair.repairMonthsOne, //保修月数1
    warrantyRange1: _d.repair && _d.repair.repairRangeOne, //保修范围
    warrantyMonths2: _d.repair && _d.repair.repairMonthsTwo, //保修月数2
    warrantyRange2: _d.repair && _d.repair.repairRangeTwo, //保修范围
    warrantyDescription: _d.repair && _d.repair.remark //保修说明
  })
]

export default {
  name: 'itemdetails',
  data() {
    return {
      STATE: {
        none: 0,
        open: 1,
        stop: 2
      },
      params: {
        id: ''
      },
      isActive: 0,
      itemForm0: Object.assign({}, ITEM_FORM[0]),
      //配件名称选项
      accessorNameOptions: [],
      dialogFormVisible0: false, //供应商编辑窗口初始隐藏
      dialogState0: 'add', //弹窗入口  add为新增, edit为编辑, see为查看，
      pagination0: {
        total: null, //数据总条数
        curr: 1, //当前索引
        pageSize: 10, //每页显示条数
        state: 'none'
      },
      rules01: {
        accessorName: [{ required: true, message: '请选择配件', trigger: 'change' }],
        assemblyName: [{ required: true, message: '请选择配件', trigger: 'change' }],
        defaultNum: [
          { required: true, message: '请输入默认数量' },
          { type: 'number', message: '请输入数字值' },
          // { type: 'number', min: 0, message: '默认数量必须大于 0' },
          {
            validator: (rule, value, callback) => {
              let maxNum
              if (this.dialogFormVisible0) {
                maxNum = this.accessorMaxNum
              } else if (this.dialogFormVisible1) {
                maxNum = this.assemblyMaxNum
              }
              if (value < 0) {
                callback(new Error('默认数量必须大于 0'))
              } else if (maxNum && value > maxNum) {
                callback(new Error('数值不能大于物品最大数量 ' + maxNum))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ],
        defaultNum1: [
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('输入不能为空'))
              } else if (/[^\.\d\s]/.test(value)) {
                callback(new Error('请输入数字'))
              } else if (value < 0) {
                callback(new Error('数值不能小于 0'))
              } else if (this.assemblyMaxNum && value > this.assemblyMaxNum) {
                callback(new Error('数值不能大于物品最大数量 ' + this.assemblyMaxNum))
              } else {
                callback()
              }
            },
            trigger: 'change'
          }
        ],
        startDateValue: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        endDateValue: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        applyto: [{ required: true, message: '请输入税率', trigger: 'blur' }]
      },
      itemForm1: Object.assign({}, ITEM_FORM[1]),
      //组装名称选项
      assemblyNameOptions: [],
      dialogFormVisible1: false, //供应商编辑窗口初始隐藏
      dialogState1: 'add', //弹窗入口  add为新增, edit为编辑, see为查看，
      pagination1: {
        total: null, //数据总条数
        curr: 1, //当前索引
        pageSize: 10, //每页显示条数
        state: 'none'
      },
      itemForm2: Object.assign({}, ITEM_FORM[2]),
      supplierNameOptions: [
        //派单供应商名称选项
      ],
      // settleSupplierNameOptions: [
      //   //结算供应商选项 与 派单供应商一样
      // ],
      dialogFormVisible2: false, //供应商编辑窗口初始隐藏
      dialogState2: 'add', //弹窗入口  add为新增, edit为编辑, see为查看，
      pagination2: {
        total: null, //数据总条数
        curr: 1, //当前索引
        pageSize: 10, //每页显示条数
        state: 'none'
      },
      rules2: {
        supplierName: [
          { required: true, message: '请选择供应商', trigger: 'change' }
        ],
        settleSupplierName: [
          { required: true, message: '请选择供应商', trigger: 'change' }
        ],
        proPrice: [{ validator: validate.numToFixed2, trigger: 'blur' }],
        startDateValue: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        endDateValue: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        taxRate: [{ validator: validate.numToFixed2, trigger: 'blur' }],
        warranty: [{ required: true, message: '请选择是否保修', trigger: 'change' }],
        warrantyMonths1: [
          { required: true, message: '请填写保修月数', trigger: 'blur' },
          { validator: validate.intNum, trigger: 'blur' }
        ],
        warrantyRange1: [
          { required: true, message: '请填写保修范围', trigger: 'blur' }
        ],
        warrantyMonths2: [{ validator: validate.intNum2, trigger: 'blur' }]
      },
      pickerOptionEnd0: {
        disabledDate: this.disabledEndDate('itemForm0')
      },
      pickerOptionStart0: {
        disabledDate: this.disabledStartDate('itemForm0')
      },
      pickerOptionEnd1: {
        disabledDate: this.disabledEndDate('itemForm1')
      },
      pickerOptionStart1: {
        disabledDate: this.disabledStartDate('itemForm1')
      },
      pickerOptionEnd2: {
        disabledDate: this.disabledEndDate('itemForm2')
      },
      pickerOptionStart2: {
        disabledDate: this.disabledStartDate('itemForm2')
      }
    }
  },
  computed: {
    ...mapGetters([
      'goodsDetail',
      'accessoriesGroup',
      'assemblyGroup',
      'priceGroup',
      'allTotal0',
      'allTotal1',
      'allTotal2'
    ]),
    assemblyMaxNum() {
      const r = this.assemblyNameOptions.filter(
        ele => this.itemForm1.assemblyName === ele.pkId
      )
      if (r && r.length > 0) {
        return r[0].maxNumber
      } else {
        return ''
      }
    },
    accessorMaxNum() {
      const r = this.accessorNameOptions.filter(
        ele => this.itemForm0.accessorName === ele.pkId
      )
      if (r && r.length > 0) {
        return r[0].maxNumber
      } else {
        return ''
      }
    }
  },
  methods: {
    ...mapActions(['getGoodsDetailById', 'getGoodsPro', 'getGoodsPrice']),
    disabledStartDate(form) {
      return time => {
        let boardDate = this[form].endDateValue
        if (boardDate) {
          return time.getTime() > boardDate.getTime()
        }
      }
    },
    disabledEndDate(form) {
      return time => {
        let boardDate = this[form].startDateValue
        if (boardDate) {
          return time.getTime() < boardDate.getTime()
        }
      }
    },
    getGoodsData() {
      if (this.isActive == 0 || this.isActive == 1) {
        this.getGoodsPro(this.getGoodsProParams())
      } else {
        this.getGoodsPrice(this.getGoodsProParams())
      }
    },
    getGoodsOtherDetail(id, cb, errCb) {
      if (this.isActive == 0 || this.isActive == 1) {
        return getGoodsPartDetail(id, cb, errCb)
      } else {
        return getGoodsPriceDetail(id, cb, errCb)
      }
    },
    // 点击tabs
    selectTabs(i) {
      this.isActive = i
      this.getGoodsData()
    },
    // 点击状态
    stateClick(state) {
      this['pagination' + this.isActive].state = state
      this['pagination' + this.isActive].curr = 1

      this.getGoodsData()
    },
    beforeClose(index) {
      this['itemForm' + index] = Object.assign({}, ITEM_FORM[index])
      this['dialogFormVisible' + index] = false
    },
    beforeOpen(i) {
      this.$refs['itemForm' + i] && this.$refs['itemForm' + i].resetFields()
      if (i === 0 || i === 1) {
        this.getGoodsRelationship(i)
      } else if (i === 2) {
        getProviders(
          { limit: 100, pageNum: 1 },
          data => {
            this.supplierNameOptions = data.items
              .filter(
                d =>
                  d.isUse &&
                  d.isState &&
                  d.classifyId === this.goodsDetail.secondCategory
              )
              .map(d => ({
                label: d.proName,
                value: d.pkId
              }))
          },
          err => {
            this.$message({ message: '获取供应商失败！', type: 'error' })
          }
        )
      }
    },
    //分页请求
    changecurrent(page) {
      this.getGoodsData()
    },
    //编辑物品详情
    operItem(index, item, type) {
      if (type === 'edit') {
        this['dialogFormVisible' + index] = true
        this['dialogState' + index] = 'edit'
        this.getGoodsOtherDetail(item.pkId, d => {
          this['itemForm' + index] = format[index](d)
        })
        return
      }

      const _params = [
        { type, id: item.pkId },
        () => {
          this.$message({ message: '操作成功！', type: 'success' })
          this.getGoodsData()
        },
        () => this.$message({ message: '操作失败！', type: 'error' })
      ]

      if (index < 2) {
        operGoodsPart(..._params)
      } else if (index === 2) {
        operGoodsPrice(..._params)
      }
    },
    getGoodsRelationship(i) {
      const attr = i === 0 ? 'accessorNameOptions' : 'assemblyNameOptions'
      const mess = i === 0 ? '配件' : '组装费'
      getGoodsRelationship(
        { type: i + 1, id: this.goodsDetail.pkId },
        data => {
          this[attr] = data
        },
        () => this.$message({ message: `获取${mess}失败`, type: 'error' })
      )
    },
    addRelationship(i) {
      this['dialogFormVisible' + i] = true
      this['dialogState' + i] = 'add'
    },
    addGoodsRelationship(i) {
      const attr = 'itemForm' + i
      const attr2 = i === 0 ? 'accessorName' : 'assemblyName'
      const mess = i === 0 ? '配件' : '组装费'

      addGoodsRelationship(
        {
          defaultNumber: this[attr].defaultNum,
          startDate: this[attr].startDateValue.getTime() + '',
          endDate: this[attr].endDateValue.getTime() + '',
          goodsId: this.goodsDetail.pkId,
          goodsTypeId: this[attr][attr2],
          natureType: i + 1,
          jrId: this[attr].applyto
        },
        () => {
          this.beforeClose(i)
          this.$message({ message: `添加物品与${mess}关系成功`, type: 'success' })
          this.getGoodsData()
        },
        () => this.$message({ message: `添加物品与${mess}关系失败`, type: 'error' })
      )
    },
    editGoodsRelationship(i) {
      const attr = 'itemForm' + i
      const attr2 = i === 0 ? 'accessorName' : 'assemblyName'
      const mess = i === 0 ? '配件' : '组装费'
      editGoodsRelationship(
        {
          pkId: this[attr].pkId,
          defaultNumber: this[attr].defaultNum,
          startDate: this[attr].startDateValue.getTime() + '',
          endDate: this[attr].endDateValue.getTime() + '',
          goodsId: this.goodsDetail.pkId,
          goodsTypeId: this[attr][attr2],
          natureType: i + 1,
          jrId: this[attr].applyto
        },
        () => {
          this.beforeClose(i)
          this.$message({ message: `编辑物品与${mess}关系成功`, type: 'success' })
          this.getGoodsData()
        },
        () => this.$message({ message: `编辑物品与${mess}关系失败`, type: 'error' })
      )
    },
    getPriceForm() {
      const f = this.itemForm2
      return {
        goodsId: this.goodsDetail.pkId,
        pkId: f.pkId,
        proId: f.supplierName.length === 36 ? f.supplierName : f.proId,
        cost: f.proPrice,
        startDate: f.startDateValue.getTime() + '',
        endDate: f.endDateValue.getTime() + '',
        jrId: f.applyto,
        rate: f.taxRate, //税率
        isRate: f.taxRateWhether,
        anProId:
          f.settleSupplierName.length === 36 ? f.settleSupplierName : f.anProId,
        isRepair: f.warranty, //保修
        repair: {
          repairMonthsOne: f.warrantyMonths1, //保修月数1
          repairRangeOne: f.warrantyRange1, //保修范围
          repairMonthsTwo: f.warrantyMonths2, //保修月数2
          repairRangeTwo: f.warrantyRange2, //保修范围
          remark: f.warrantyDescription //保修说明
        }
      }
    },
    saveAddSupplier(i) {
      this.$refs['itemForm' + i].validate(valid => {
        if (valid) {
          if (i < 2) this.addGoodsRelationship(i)
          else {
            addGoodsPrice(
              this.getPriceForm(),
              () => {
                this.beforeClose(i)
                this.$message({ message: `添加价格成功`, type: 'success' })
                this.getGoodsData()
              },
              () => this.$message({ message: `添加价格失败`, type: 'error' })
            )
          }
        } else {
          return false
        }
      })
    },
    saveEditSupplier(i) {
      this.$refs['itemForm' + i].validate(valid => {
        if (valid) {
          if (i < 2) this.editGoodsRelationship(i)
          else {
            editGoodsPrice(
              this.getPriceForm(),
              () => {
                this.beforeClose(i)
                this.$message({ message: `编辑价格成功`, type: 'success' })
                this.getGoodsData()
              },
              () => this.$message({ message: `编辑价格失败`, type: 'error' })
            )
          }
        } else {
          return false
        }
      })
    },
    getGoodsProParams() {
      const pagination = this['pagination' + this.isActive]
      return {
        type: this.isActive,
        state: pagination.state,
        id: this.$route.params.id,
        pageSize: pagination.pageSize,
        curr: pagination.curr
      }
    }
  },
  activated() {
    if (this.params.id === this.$route.params.id) {
      return
    }
    this.params = { ...this.$route.params }
    this.isActive = this.params.type === 0 ? 0 : 2
    this.getGoodsDetailById(this.$route.params.id)
    this.getGoodsData()
  }
}
</script>

<style>
/* 池峰添加08.15  */
.room-tabs {
  height: 42px;
  background-color: #f2f4f8;
  border-left: 1px solid #cbd2d4;
}
.room-tabs ul li {
  float: left;
  line-height: 40px;
  height: 40px;
  font-size: 16px;
  border-right: 1px solid #cbd2d4;
  border-top: 1px solid #cbd2d4;
  border-bottom: 1px solid #cbd2d4;
}
.room-tabs ul li a {
  color: #333;
  display: block;
  width: 168px;
  height: 40px;
  font-size: 16px;
  text-align: center;
  background-color: #f5f7f7;
}
.room-tabs ul li a.cur {
  border-top: 3px solid #3ba0ff;
  height: 39px;
  line-height: 39px;
  border-bottom: 0;
  background-color: #fff;
}
.room-tabs ul > span {
  display: inline-block;
  width: -moz-calc(100% - 1184px);
  width: -webkit-calc(100% - 1184px);
  width: -calc(100% - 1184px);
  border-bottom: 1px solid #cbd2d4;
  height: 41px;
}
.room-tabs ul li a .small {
  font-size: 14px;
}
.room-tabs ul li a:hover {
  color: #3ba0ff;
}
#itemdetails > .showit {
  display: block;
}
#itemdetails > .hideit {
  display: none;
}
.dialog-footer {
  padding: 30px 20px 50px;
}
.tworowForm {
  padding-left: 20px;
}
.tworowForm .content120 .el-form-item__content {
  margin-left: 120px;
}
.taxRate > .el-form-item__content > .el-input {
  width: 60%;
}
.taxRate > .el-form-item__content > .el-select {
  width: 38%;
}
.tworowForm .visibilhide {
  visibility: hidden;
}
.dataBox .total {
  display: inline-block;
  margin-left: 20px;
}
.dataBox .total li {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
}
.dataBox .total li.active {
  color: #3ba0ff;
}

.modtable tr th:last-child {
  width: 180px;
}
.modtable .typeControl a:nth-child(2) {
  padding: 0 15px;
}
.detail-title li {
  display: inline-block;
  min-width: 200px;
}
</style>
