<template>
	<div id="calendar">
		<div class="aboluo-tools">
			<div class="aboluo-calendar-select-year">
			</div>
			<div class="aboluo-calendar-month">
				<a class="aboluo-month-a-perv" href="javascript:;"></a>
				<a class="aboluo-month-a-next" href="javascript:;"></a>
			</div>
			<input type="button" class="aboluo-toToday" value="返回今天" />
			<input v-if="hasPermission('PZ_createOrModifyHoliday')" type="button" value="设置为节假日" @click="saveAllholidayData" class="surebtn" style="margin:18px 0 0 10px;" />
		</div>
		<div class="aboluo-w-700">
			<div class="aboluo-leftdiv">

				<div class="aboluo-rilidiv">
					<table class="aboluo-rilitable" cellspacing="0" cellpadding="0">
						<thead class="aboluo-rilithead">
							<tr>
								<th>一</th>
								<th>二</th>
								<th>三</th>
								<th>四</th>
								<th>五</th>
								<th style="color:red;">六</th>
								<th style="color:red;">日</th>
							</tr>
						</thead>
						<tbody class="aboluo-rilitbody">

						</tbody>
					</table>
				</div>
			</div>
			<div class="aboluo-rightdiv">
				<div class="aboluo-xssj">
					<p>选中日期</p>
					<p v-for="(item,index) in myelectDay" @click="deleteDay(item,index)" class="seleDay">{{item}}
						<i class="delet"></i>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getHoliday, saveHolidayData } from '../../api/mgmtcenter'
import permission from '@/mixins/permission.js'

export default {
  name: 'calendar',
  data() {
    return {
      myYear: null, //年份
      myMonth: null, //月份
      justDay: [], //仅存放具体日期
      myholiday: [], //存储当前月份的节假日数据
      myelectDay: [] //存储当前月份选中的日期
    }
  },
  methods: {
    //点击取消已选中的日期
    deleteDay(item, index) {
      //当前具体日期
      var myDayvalue = this.justDay[index]
      myDayvalue = myDayvalue - 1
      this.myholiday[myDayvalue] = '0'

      this.myelectDay.splice(index, 1) //改变选中日期数据
      this.justDay.splice(index, 1)
      //找到对应日历中相同月份的元素
      var iwantA = $('.aboluo-rilitbody').find("a[date='" + item + "']")
      iwantA.removeClass('aboluo-aclick')
      iwantA.parent().removeClass('mego-relative')
      iwantA.next('.mego-hoilday').remove()
    },
    //保存当月的节假日设置
    saveAllholidayData() {
      saveHolidayData(
        {
          year: this.myYear,
          month: this.myMonth,
          electDay: this.myholiday.join(',')
        },
        providers => {
          this.$message({ type: 'success', message: '设置节假日成功！' })
        },
        () => this.$message({ type: 'error', message: '设置节假日失败！' })
      )
    }
  },
  mounted: function() {
    var that = this
    var jjrmodelidlist //用于存放从数据库取出的所有节假日的id
    var jjrmodeltimelist //用于存放从数据库取出的所有节假日的time
    var jjrmodelztlist //用于存放从数据库取出的所有节假日的状态

    function getHolidaydata(year, month) {
      that.myYear = year
      that.myMonth = month
      that.justDay = [] //清空数据
      that.myholiday = [] //清空数据
      that.myelectDay = [] //清空数据
      getHoliday(
        year,
        month,
        providers => {
          that.myholiday = providers.electDay.split(',')
          for (var z = 0; z < that.myholiday.length; z++) {
            if (that.myholiday[z] == 1) {
              var dateIndex = z + 1
              var mydate = year + '-' + month + '-' + dateIndex
              that.myelectDay.push(mydate)
              that.justDay.push(dateIndex)
            }
          }

          //获取到当月假期后则赋值给相应的日历td上
          for (var y = 0; y < that.myelectDay.length; y++) {
            var mywantA = $('.aboluo-rilitbody').find(
              "a[date='" + that.myelectDay[y] + "']"
            )
            mywantA.addClass('aboluo-aclick')
            mywantA.parent().addClass('mego-relative')
            mywantA.after("<span class='mego-hoilday'>节假日</span>")
          }
        },
        () => that.$message({ type: 'warning', message: '该月还未设置节假日！' })
      )
    }

    getHolidaydata(new Date().getFullYear(), new Date().getMonth() + 1) //初始化获取数据

    createSelectYear() //创建年份下拉,并给对应事件
    createMonthSelect() //创建月份下拉，并给对应事件
    getjjrszModelByYear(withID('aboluo-yearSelect').value) //从数据库取出已经设置了的节假日的数据，例：休息，上班等
    //根据年，月，用table绘制日历。 年月变动则 重新绘制
    createTabledate(
      parseInt(withID('aboluo-yearSelect').value),
      parseInt(withID('aboluo-selectmonth').value)
    )
    //上月下月的a标签给事件
    leftrightclick()
    //设置右边显示栏显示内容，显示栏还可以设置节假日的状态等
    setRigth(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    )

    //阻止冒泡
    function stopBubble(e) {
      if (e && e.stopPropagation) {
        // 别的浏览器
        e.stopPropagation()
      } else {
        //IE
        window.event.cancelBubble = true
      }
    }
    //定义了yearselect并赋值,且添加事件，选择则对应的table日期也将改变,且已选中日期会跳到当前选择月的日期，然后给右边明细栏赋值
    function createSelectYear() {
      withClass('aboluo-calendar-select-year').innerHTML =
        '<select name="aboluo-yearSelect" id="aboluo-yearSelect"></select>'
      var yearSelect = withID('aboluo-yearSelect')
      var Nowtime = new Date()
      var currYear = Nowtime.getFullYear()
      for (var i = 0; i <= 79; i++) {
        yearSelect.options.add(new Option(i + 1970 + '年', i + 1970))
        if (currYear == i + 1970) {
          yearSelect.options[i].selected = true
        }
      }
      yearSelect.onchange = function(e) {
        var aclick = withClass('aboluo-aclick')
        //重新赋值给变全局变量,所有的带状态的日期;然后下一步将创建table,完成动态样式,
        //这里要重读数据就5个位置,选择年时,上一个月,下一个月,设置节假日button,返回今天button
        getjjrszModelByYear(withID('aboluo-yearSelect').value)
        createTabledate(
          withID('aboluo-yearSelect').value,
          withID('aboluo-selectmonth').value
        )
        if (aclick == '') {
          //说明没选,或选的当天,算出选的这个月有多少天,与原来的那个月的天数一对比,如果原来的天数大于现在的天数,那么对换
          //这里先算当前月当前天,然后算出选择的那个月总天数,然后对比,如果当前天大于选择的那个月那天,对换
          var pervdays1 = getCurrMonthLashDay(
            withID('aboluo-yearSelect').value,
            withID('aboluo-selectmonth').value
          )
          if (new Date().getDate() > pervdays1) {
            setRigth(
              withID('aboluo-yearSelect').value,
              withID('aboluo-selectmonth').value,
              pervdays1
            )
          } else {
            setRigth(
              withID('aboluo-yearSelect').value,
              withID('aboluo-selectmonth').value,
              new Date().getDate()
            )
          }
        } else {
          var adate = aclick.getAttribute('date')
          var aarr = adate.split('-')
          aarr[0] = parseInt(aarr[0])
          aarr[1] = parseInt(aarr[1])
          aarr[2] = parseInt(aarr[2])
          var pervdays = getCurrMonthLashDay(
            withID('aboluo-yearSelect').value,
            withID('aboluo-selectmonth').value
          )
          if (aarr[2] > pervdays) {
            aarr[2] = pervdays
          }
          setRigth(
            withID('aboluo-yearSelect').value,
            withID('aboluo-selectmonth').value,
            aarr[2]
          )
        }
        //选择年份重新请求数据
        getHolidaydata(
          withID('aboluo-yearSelect').value,
          withID('aboluo-selectmonth').value
        )
      }
    }

    function getjjrszModelByYear(year) {
      jjrmodelidlist = ['1', '2']
      jjrmodeltimelist = ['2015-08-30 00:00:00', '2015-08-31 00:00:00'] //这里时间的格式为yyyy-MM-dd HH:mm:ss
      jjrmodelztlist = ['1', '2'] //1为上班，2为休息
    }

    //创建月的下拉框，并赋值,且添加事件，选择则对应的table日期也将改变,且已选中日期会跳到当前选择月的日期，然后给右边明细栏赋值
    function createMonthSelect() {
      var selectmonth = newElement('select')
      selectmonth.name = 'aboluo-selectmonth'
      selectmonth.id = 'aboluo-selectmonth'
      selectmonth.onchange = function(e) {
        var aclick = withClass('aboluo-aclick')
        createTabledate(
          withID('aboluo-yearSelect').value,
          selectmonth.options[selectmonth.selectedIndex].value
        )
        if (aclick == '') {
          //说明没选,或选的当天,算出选的这个月有多少天,与原来的那个月的天数一对比,如果原来的天数大于现在的天数,那么对换
          //这里先算当前月当前天,然后算出选择的那个月总天数,然后对比,如果当前天大于选择的那个月那天,对换
          var pervdays1 = getCurrMonthLashDay(
            withID('aboluo-yearSelect').value,
            selectmonth.options[selectmonth.selectedIndex].value
          )
          if (new Date().getDate() > pervdays1) {
            setRigth(
              withID('aboluo-yearSelect').value,
              selectmonth.options[selectmonth.selectedIndex].value,
              pervdays1
            )
          } else {
            setRigth(
              withID('aboluo-yearSelect').value,
              selectmonth.options[selectmonth.selectedIndex].value,
              new Date().getDate()
            )
          }
        } else {
          var adate = aclick.getAttribute('date')
          var aarr = adate.split('-')
          aarr[0] = parseInt(aarr[0])
          aarr[1] = parseInt(aarr[1])
          aarr[2] = parseInt(aarr[2])
          var pervdays = getCurrMonthLashDay(
            withID('aboluo-yearSelect').value,
            selectmonth.options[selectmonth.selectedIndex].value
          )
          if (aarr[2] > pervdays) {
            aarr[2] = pervdays
          }
          setRigth(
            withID('aboluo-yearSelect').value,
            selectmonth.options[selectmonth.selectedIndex].value,
            aarr[2]
          )
        }

        //选择月份重新请求数据
        getHolidaydata(
          withID('aboluo-yearSelect').value,
          withID('aboluo-selectmonth').value
        )
      }
      var Nowtime = new Date()
      var currMonth = Nowtime.getMonth()
      for (var i = 0; i < 12; i++) {
        selectmonth.options.add(new Option(i + 1 + '月', i + 1))
        if (currMonth == i) {
          selectmonth.options[i].selected = true
        }
      }
      var next = withClass('aboluo-month-a-next')
      var parent = next.parentNode
      parent.insertBefore(selectmonth, next)
    }

    //根据传入的年月，创建对应的table日期,并且在每个td中创建a标签用于事件，与样式内边框的设置
    function createTabledate(year, yue) {
      var rilitabledele = withClass('aboluo-rilitbody')
      if (
        rilitabledele != '' &&
        rilitabledele != null &&
        rilitabledele != 'undefined'
      ) {
        rilitabledele.parentNode.removeChild(rilitabledele)
      }
      var rilitable = newElement('tbody')
      rilitable.setAttribute('class', 'aboluo-rilitbody')
      var rili = withClass('aboluo-rilitable')
      rili.appendChild(rilitable)
      //先得到当前月第一天是星期几,然后根据这个星期算前面几天的上个月最后几天.
      var date = setdateinfo(year, yue, 1)
      var weekday = date.getDay()
      var pervLastDay
      if (weekday != 0) {
        pervLastDay = weekday - 1
      } else {
        pervLastDay = weekday + 6
      }
      //得到上个月最后一天是几号;
      var pervMonthlastDay = getPervMonthLastDay(year, yue)
      //上月从几号开始循环
      var lastdays = pervMonthlastDay - pervLastDay + 1
      //				debugger;
      var tr = newElement('tr')
      for (var i = lastdays; i <= pervMonthlastDay; i++) {
        var td = newElement('td')
        var a = getA(
          parseInt(yue) - 1 == 0 ? parseInt(year) - 1 : year,
          parseInt(yue) - 1 == 0 ? 12 : parseInt(yue) - 1,
          i
        )
        a.style.color = '#BFBFC5'
        //		a.href ='javascript:pervA('+parseInt(yue)-1==0?parseInt(year)-1:year+','+parseInt(yue)-1==0?12:parseInt(yue)-1+','+i+');';
        td.appendChild(a)
        td.setAttribute('class', 'aboluo-pervMonthDays')
        tr.appendChild(td)
      }
      //这个月开始的循环
      var startDays = 8 - weekday == 8 ? 1 : 8 - weekday
      for (var i = 1; i <= startDays; i++) {
        var td = newElement('td')
        var b = getA(year, yue, i)
        td.appendChild(b)
        tr.appendChild(td)
      }
      rilitable.appendChild(tr)
      //指定年月最后一天
      var currMonthLashDay = getCurrMonthLashDay(year, yue)
      //当月除开第一行的起点
      var currmonthStartDay =
        currMonthLashDay - (currMonthLashDay - startDays) + 1
      //当月还剩余的天数
      var syts = currMonthLashDay - startDays
      //循环次数
      var xhcs = 0
      if (check(syts / 7)) {
        //是小数
        xhcs = Math.ceil(syts / 7) //向上取整
      } else {
        xhcs = syts / 7
      }

      //这是下个月开始的变量;
      var jilvn = 1
      for (var i = 0; i < xhcs; i++) {
        var tr1 = newElement('tr')
        if (i != xhcs - 1) {
          //						tr1.style.borderBottom="1px solid #e3e4e6";
        }
        for (var n = 1; n <= 7; n++) {
          var td = newElement('td')
          if (startDays == 0) {
            var c = getA(
              parseInt(yue) + 1 == parseInt(13) ? parseInt(year) + 1 : year,
              parseInt(yue) + 1 == parseInt(13) ? 1 : parseInt(yue) + 1,
              jilvn
            )
            c.style.color = '#BFBFC5'
            td.appendChild(c)
            td.setAttribute('class', 'aboluo-nextMonthDays')
            jilvn++
            tr1.appendChild(td)
            continue
          } else {
            startDays++
            var d = getA(year, yue, startDays)
            td.appendChild(d)
            if (startDays == currMonthLashDay) {
              startDays = 0
            }
            tr1.appendChild(td)
          }
        }
        rilitable.appendChild(tr1)
      }
      setHolidayred() //设置星期六星期天的样式
      setTrHeight() //设置table日期的行高
      setA() //设置td中a的事件
    }

    //给上一个月最后几天点击跳转月份
    function pervA(year, yue, day) {
      createTabledate(year, yue) //创建对应的table(日期)
      setRigth(year, yue, day) //设置右边明细栏内容
      updateSelect(year, yue) //改变年月select值
    }

    //给上一个月最后几天点击跳转月份
    function nextA(year, yue, day) {
      createTabledate(year, yue)
      setRigth(year, yue, day)
      updateSelect(year, yue)
    }

    function updateSelect(year, yue) {
      var selectmonth = withID('aboluo-selectmonth')
      var selectyear = withID('aboluo-yearSelect')
      selectmonth.value = yue
      selectyear.value = year
    }

    //遍历table将date事件等
    function setHolidayred() {
      var rows = withClass('aboluo-rilitbody').rows
      for (var i = 0; i < rows.length; i++) {
        for (var j = 0; j < rows[i].cells.length; j++) {
          var cell = rows[i].cells[j]
          var a = rows[i].cells[j].childNodes[0]
          var adate = a.getAttribute('date')
          var arr = adate.split('-')
          var date = new Date()
          var year = date.getFullYear()
          var month = date.getMonth()
          var day = date.getDate()
          //判断是否为今天mego
          if (arr[0] == year && arr[1] == month + 1 && arr[2] == day) {
            cell.setAttribute('class', 'aboluo-tdcurrToday')
            a.setAttribute('class', 'aboluo-currToday')
            $(cell).append("<span class='taday'>今天</span>")
          }
          //默认判断是否为 周六，周日 添加样式mego
          // if(j>=rows[i].cells.length-2 ){
          // 	if(cell.getAttribute("class")!="aboluo-nextMonthDays" && cell.getAttribute("class")!="aboluo-pervMonthDays" && cell.getAttribute("class")!="aboluo-tdcurrToday"){
          // 		cell.setAttribute("class","aboluo-tdhoilday");
          // 		a.setAttribute("class","aboluo-hoilday");
          // 		$(cell).append("<span class='hoilday'>节假日</span>");

          // 	}
          // }
        }
      }
    }

    //给rightdiv创建元素并赋值，根据传入的年月日给内部的元素赋值 ,月份是 1-12
    function setRigth() {
      //				setaclass(year,yue,day);
      //先清空
      withClass('aboluo-xssj').innerHTML = ''
      //withClass("aboluo-ssjjr").innerHTML="";
      //				year=year.toString();
      //				yue=yue.toString();
      //				day=day.toString();
      //设置rigthdiv的marginleft;
      var rigthdiv = withClass('aboluo-rightdiv')
      var w = withClass('aboluo-w-700')
      rigthdiv.style.marginLeft = w.offsetWidth * 0.8 + 4 + 'px' //设置margin-left

      //池峰自定义-begin
      var p = newElement('p')
      p.innerHTML = '选中日期'
      var aboluoxssj = withClass('aboluo-xssj')
      aboluoxssj.style.height = '100%'
      $(aboluoxssj).css('overflow', 'hidden')
      aboluoxssj.appendChild(p)
      var curra = getAclickDom()
      // if(curra.length>5){
      // 	that.$message('请选择小于6个');
      // }
      for (var i = 0; i < curra.length; i++) {
        var date = $(curra[i]).attr('date')
        var datearr = date.split('-')
        var p = newElement('p')
        $(p).addClass('seleDay')
        var date = setdateinfo(datearr[0], datearr[1], datearr[2])
        p.innerHTML = formatByYearyueday(datearr[0], datearr[1], datearr[2])
        aboluoxssj.appendChild(p)
        $(p).append('<i class="delet"></i>')
      }
      //池峰自定义-end

      //右侧移除选中日期列表中的事件mego
      $('.aboluo-xssj')
        .find('.seleDay')
        .on('click', function() {
          $(this).remove()
          var megoDate = $(this).text()
          //找到对应日历中相同月份的元素
          var iwantA = $('.aboluo-rilitbody').find("a[date='" + megoDate + "']")
          iwantA.removeClass('aboluo-aclick')
          iwantA.parent().removeClass('mego-relative')
          iwantA.next('.mego-hoilday').remove()
        })
    }

    function formatByYearyueday(year, yue, day) {
      return year + '-' + yue + '-' + day
    }

    function formatByDate(date) {
      date = date.substring(0, 10)
      var daxx = date.split('-')
      return daxx[0] + '-' + daxx[1] + '-' + daxx[2]
    }

    //给tbody中的td中的A设置事件，上个月的天数,这个月的天数,下个月的天数三种对应的事件
    //这里还有个功能就是判断当前的A中日期是不是数据库中有带状态的日期,如果是就给相当的样式
    function setA() {
      var tbody = withClass('aboluo-rilitbody')
      var arr = tbody.getElementsByTagName('a')
      for (var i = 0; i < arr.length; i++) {
        var date = arr[i].getAttribute('date')
        var datearr = date.split('-')
        if (arr[i].parentNode.className == 'aboluo-pervMonthDays') {
          arr[i].onclick = function(e) {
            var a = withClass('aboluo-aclick')
            $(a).attr('class', '')
            date = e.target.getAttribute('date')
            datearr = date.split('-')
            pervA(datearr[0], datearr[1], datearr[2])
            stopBubble(e)
          }
        } else if (arr[i].parentNode.className == 'aboluo-nextMonthDays') {
          arr[i].onclick = function(e) {
            var a = withClass('aboluo-aclick')
            $(a).attr('class', '')
            date = e.target.getAttribute('date')
            datearr = date.split('-')
            nextA(datearr[0], datearr[1], datearr[2])
            stopBubble(e)
          }
        } else {
          arr[i].onclick = function(e) {
            date = e.target.getAttribute('date')

            datearr = date.split('-') //mego防止点击"节假日"报错
            if (
              e.target.getAttribute('class') ==
                'aboluo-currToday aboluo-aclick' ||
              e.target.getAttribute('class') == 'aboluo-currToday'
            ) {
              //点击"今天"td触发的事件
              that.$message('当天不能设置!')
            } else if (e.target.getAttribute('class') == 'aboluo-aclick') {
              $(this)
                .next('.mego-hoilday')
                .remove()
              stopBubble(e)
              $(e.target).removeClass('aboluo-aclick')
              //setRigth();
              for (var m = 0; m < that.myelectDay.length; m++) {
                if (that.myelectDay[m] == date) {
                  var myDayvalue = that.justDay[m]
                  myDayvalue = myDayvalue - 1
                  that.myholiday[myDayvalue] = '0'

                  that.myelectDay.splice(m, 1)
                  that.justDay.splice(m, 1)
                }
              }
            } else {
              if (that.myelectDay.length > 9) {
                that.$message('当月节假日不可超过10天!')
              } else {
                var dayday = date.substring(date.length - 2)
                //先获取最后2位,判断字符串中是否含有"-"号
                if (dayday.indexOf('-') != -1) {
                  dayday = dayday.substring(1)
                }
                that.myelectDay.push(date)
                that.justDay.push(parseInt(dayday))
                that.myholiday[parseInt(dayday) - 1] = '1'
                setaclass(datearr[0], datearr[1], datearr[2])
                //setRigth();
                stopBubble(e)
              }
            }
          }
        }
        for (var n = 0; n < jjrmodelidlist.length; n++) {
          if (formatByDate(jjrmodeltimelist[n]) == formatByDate(date)) {
            if (jjrmodelztlist[n] == 1) {
              //1上班
              var span = newElement('span')
              span.setAttribute('class', 'aboluo-td-a-ban')
              arr[i].style.background = '#f5f5f5'
              arr[i].setAttribute('ztid', jjrmodelidlist[n])
              arr[i].setAttribute('jjrzt', jjrmodelztlist[n])
              span.innerHTML = '班'
              arr[i].appendChild(span)
            } else if (jjrmodelztlist[n] == 2) {
              //2休息
              var span = newElement('span')
              span.setAttribute('class', 'aboluo-td-a-xiu')
              arr[i].setAttribute('ztid', jjrmodelidlist[n])
              arr[i].setAttribute('jjrzt', jjrmodelztlist[n])
              arr[i].style.background = '#fff0f0'
              span.innerHTML = '休'
              arr[i].appendChild(span)
            } else if (jjrmodelztlist[n] == 0) {
              // 这里为了保证操作过的节假日的唯一性,不给样式只设置a的ztid
              arr[i].setAttribute('ztid', jjrmodelidlist[n])
              arr[i].setAttribute('jjrzt', jjrmodelztlist[n])
            }
          }
        }
      }
    }

    //a点击选中样式,先清除再设置选中样式
    function setaclass(year, yue, day) {
      //				var a=withClass("aboluo-aclick");
      //					a.className="";
      var date = new Date()
      var year1 = date.getFullYear()
      var month1 = date.getMonth()
      var day1 = date.getDate()
      if (year1 == year && yue == month1 + 1 && day1 == day) {
      } else {
        var tbody = withClass('aboluo-rilitbody')
        var arr = tbody.getElementsByTagName('a')
        for (var i = 0; i < arr.length; i++) {
          var date = arr[i].getAttribute('date')
          var datearr = date.split('-')
          if (datearr[0] == year && datearr[1] == yue && datearr[2] == day) {
            arr[i].setAttribute('class', 'aboluo-aclick')
            arr[i].parentNode.setAttribute('class', 'mego-relative')
            $(arr[i]).after("<span class='mego-hoilday'>节假日</span>")
          }
        }
      }
    }

    //获取当前选取的日期
    function getAclickDomDate() {
      var aclick = withClass('aboluo-aclick')
      if (aclick == '') {
        //说明没选,那么就给当天,按12月算
        var date = new Date()
        return (
          date.getFullYear() +
          '-' +
          (date.getMonth() + 1) +
          '-' +
          date.getDate()
        )
      } else {
        return aclick.getAttribute('date')
      }
    }

    //获取当前选中的a元素
    function getAclickDom() {
      var aclick = $('.aboluo-aclick')
      if (aclick == '') {
        //说明没选,那么就给当天,按12月算
        return $('.aboluo-currToday')
      } else {
        return aclick
      }
    }

    //创建元素
    function newElement(val) {
      return document.createElement(val)
    }

    //创建date对象并赋值
    function setdateinfo(year, yue, day) {
      var date = new Date()
      date.setFullYear(parseInt(year))
      date.setMonth(parseInt(yue) - 1)
      date.setDate(parseInt(day))
      return date
    }

    //根据年月日判断是不是星期六星期天 //yue 按12算
    function isweekend(year, yue, day) {
      var date = new Date('2000-0-1')
      date.setFullYear(year)
      date.setMonth(yue - 1)
      date.setDate(day)
      var week = date.getDay()
      if (week == 0 || week == 6) {
        return true
      }
      return false
    }

    //根据getDay()返回对应的星期字符串
    function getWeek(val) {
      var weekxq = new Array()
      weekxq[0] = '星期日'
      weekxq[1] = '星期一'
      weekxq[2] = '星期二'
      weekxq[3] = '星期三'
      weekxq[4] = '星期四'
      weekxq[5] = '星期五'
      weekxq[6] = '星期六'
      return weekxq[val]
    }

    //判断c是否是小数
    function check(c) {
      var r = /^[+-]?[1-9]?[0-9]*\.[0-9]*$/
      return r.test(c)
    }

    //得到指定月的上个月最后一天传进来按 12月算
    function getPervMonthLastDay(year, yue) {
      //当月就是  yue-1 也就是计算机里面的0-11月份,那么算上个月的最后一天就是当月的0天
      return parseInt(new Date(year, yue - 1, 0).getDate())
    }

    //得到指定月最后一天 传进来按 12月算
    function getCurrMonthLashDay(year, yue) {
      if (yue >= 12) {
        year = year + 1
        yue = yue - 12
      }
      return parseInt(new Date(year, yue, 0).getDate())
    }

    //创建a标签并设置公用属性
    function getA(year, yue, day) {
      var a = newElement('a')
      a.href = 'javascript:;'
      a.innerHTML = day
      a.style.textDecoration = 'none'
      a.setAttribute('date', year + '-' + yue + '-' + day)
      return a
    }

    //给左右的a添加事件
    function leftrightclick() {
      var lefta = withClass('aboluo-month-a-perv')
      var righta = withClass('aboluo-month-a-next')
      //右侧翻月
      righta.onclick = function() {
        var monthselect = withID('aboluo-selectmonth')
        var monthvalue = parseInt(monthselect.value)
        var yearselect = withID('aboluo-yearSelect')
        var yearvalue = parseInt(yearselect.value)
        if (monthvalue == 12) {
          yearvalue += 1
          //这里已经变了一年了,所以就要根据年重读数据
          getjjrszModelByYear(yearvalue)
          monthvalue = 1
        } else {
          monthvalue += 1
        }
        monthselect.value = monthvalue
        yearselect.value = yearvalue
        var aclick = withClass('aboluo-aclick')
        createTabledate(yearselect.value, monthselect.value)

        //重新请求数据
        getHolidaydata(yearvalue, monthvalue)

        //如果没有找到这个class说明没有点击或是点击的当天
        if (aclick == '') {
          var pervdays1 = getCurrMonthLashDay(
            yearselect.value,
            monthselect.value + 1
          )
          if (new Date().getDate() > pervdays1) {
            setRigth(yearselect.value, monthselect.value, pervdays1)
          } else {
            setRigth(yearselect.value, monthselect.value, new Date().getDate())
          }
        } else {
          var adate = aclick.getAttribute('date')
          var aarr = adate.split('-')
          aarr[0] = parseInt(aarr[0])
          aarr[1] = parseInt(aarr[1])
          aarr[2] = parseInt(aarr[2])
          var pervdays = getCurrMonthLashDay(aarr[0], aarr[1] + 1)
          if (aarr[2] > pervdays) {
            aarr[2] = pervdays
          }
          setRigth(
            aarr[1] + 1 == 13 ? aarr[0] + 1 : aarr[0],
            aarr[1] + 1 == 13 ? 1 : aarr[1] + 1,
            aarr[2]
          )
        }
      }
      //左侧翻月mego
      lefta.onclick = function() {
        var monthselect = withID('aboluo-selectmonth')
        var monthvalue = parseInt(monthselect.value)
        var yearselect = withID('aboluo-yearSelect')
        var yearvalue = parseInt(yearselect.value)
        if (monthvalue == 1) {
          yearvalue -= 1
          //这里已经变了一年了,所以就要根据年重读数据
          getjjrszModelByYear(yearvalue)
          monthvalue = 12
        } else {
          monthvalue -= 1
        }
        monthselect.value = monthvalue
        yearselect.value = yearvalue
        var aclick = withClass('aboluo-aclick')
        createTabledate(yearselect.value, monthselect.value)

        //重新请求数据
        getHolidaydata(yearvalue, monthvalue)

        //如果没有找到这个class说明没有点击或是点击的当天
        if (aclick == '') {
          //这个时候向上一个月,那么
          var pervdays1 = getPervMonthLastDay(
            yearselect.value,
            monthselect.value
          )
          if (new Date().getDate() > pervdays1) {
            setRigth(yearselect.value, monthselect.value, pervdays1)
          } else {
            setRigth(yearselect.value, monthselect.value, new Date().getDate())
          }
        } else {
          var adate = aclick.getAttribute('date')
          var aarr = adate.split('-')
          aarr[0] = parseInt(aarr[0])
          aarr[1] = parseInt(aarr[1])
          aarr[2] = parseInt(aarr[2])
          var pervdays = getPervMonthLastDay(aarr[0], aarr[1])
          if (aarr[2] > pervdays) {
            aarr[2] = pervdays
          }
          setRigth(
            aarr[1] - 1 == 0 ? aarr[0] - 1 : aarr[0],
            aarr[1] - 1 == 0 ? 12 : aarr[1] - 1,
            aarr[2]
          )
        }
      }
      //返回今天执行事件mego
      var today = withClass('aboluo-toToday')
      today.onclick = function() {
        var monthselect = withID('aboluo-selectmonth')
        var yearselect = withID('aboluo-yearSelect')
        var date = new Date()
        monthselect.value = date.getMonth() + 1
        yearselect.value = date.getFullYear()
        getjjrszModelByYear(date.getFullYear())
        createTabledate(yearselect.value, monthselect.value)
        setRigth(date.getFullYear(), date.getMonth() + 1, date.getDate())

        getHolidaydata(new Date().getFullYear(), new Date().getMonth() + 1) //初始化获取数据
      }
    }

    //动态设置tr高度,动态给td中的A设置高度与宽度
    function setTrHeight() {
      var table = withClass('aboluo-rilidiv')
      var thead = withClass('aboluo-rilithead')
      var tbody = withClass('aboluo-rilitbody')
      var tbodyheight = table.offsetHeight - 2 - thead.offsetHeight
      var rows = tbody.getElementsByTagName('tr')
      for (var i = 0; i < rows.length; i++) {
        rows[i].style.height = Math.floor(tbodyheight / rows.length) + 'px'
        var tds = rows[i].getElementsByTagName('td')
        for (var j = 0; j < tds.length; j++) {
          var a = tds[j].childNodes[0]
          a.style.width = tds[j].offsetWidth - 10 + 'px'
          a.style.height = tds[j].offsetHeight - 7 + 'px'
          a.style.lineHeight = tds[j].offsetHeight - 7 + 'px'
        }
      }
    }
    //得到id对象
    function withID(id) {
      return document.getElementById(id)
    }
    //得到传入参数为class的对象(同名返回第一个)
    function withClass(id) {
      var targets = targets || document.getElementsByTagName('*')
      var list = []
      for (var k in targets) {
        var target = targets[k]
        if (target.className == id) {
          return target
        }
      }
      return ''
    }
  },
  mixins:[permission]
}
</script>

<style type="text/css" scoped>
table {
  max-width: 100%;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
}
button,
html input[type='button'],
input[type='reset'],
input[type='submit'] {
  cursor: pointer;
  -webkit-appearance: button;
}

input,
button,
select,
textarea {
  font-family: 'Microsoft YaHei', 'Lato', 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
}

select {
  width: 220px;
  background-color: #fff;
  border: 1px solid #dce4ec;
}

select,
input[type='file'] {
  height: 30px;
  line-height: 30px;
}

select,
textarea,
input[type='text'],
input[type='password'],
input[type='datetime'],
input[type='datetime-local'],
input[type='date'],
input[type='month'],
input[type='time'],
input[type='week'],
input[type='number'],
input[type='email'],
input[type='url'],
input[type='search'],
input[type='tel'],
input[type='color'],
.uneditable-input {
  display: inline-block;
  height: 20px;
  padding: 4px 6px;
  margin-bottom: 10px;
  font-size: 15px;
  line-height: 20px;
  color: #95a5a6;
  vertical-align: middle;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}

input,
button,
select,
textarea {
  font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

label,
input,
button,
select,
textarea {
  font-size: 15px;
  font-weight: normal;
  line-height: 20px;
}

label,
select,
button,
input[type='button'],
input[type='reset'],
input[type='submit'],
input[type='radio'],
input[type='checkbox'] {
  cursor: pointer;
}

button,
input,
select,
textarea {
  margin: 0;
  font-size: 100%;
  vertical-align: middle;
}

#calendar {
  height: 100%;
  background: #fff;
}
.aboluo-w-700 {
  margin: 0 auto;
}
</style>