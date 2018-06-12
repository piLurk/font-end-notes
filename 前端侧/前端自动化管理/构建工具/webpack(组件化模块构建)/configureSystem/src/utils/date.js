function padStartTo2With0(source) {
  source = String(source);
  var l = 2 - source.length;

  while (l-- > 0) {
    source = '0' + source
  }
  return source
}

Date.prototype.getBJDate = function () {
  var year = this.getFullYear();
  var month = this.getMonth() + 1 < 10 ? "0" + (this.getMonth() + 1) : this.getMonth() + 1;
  var day = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
  return year + "-" + month + "-" + day;
}
Date.prototype.getBJTime = function () {
  var year = this.getFullYear();
  var month = padStartTo2With0(this.getMonth() + 1);
  var day = padStartTo2With0(this.getDate());
  var hours = padStartTo2With0(this.getHours())
  var minutes = padStartTo2With0(this.getMinutes())
  return year + "-" + month + "-" + day + '  ' + hours + ':' + minutes;
}
Date.prototype.getBJTime00 = function () {
  var year = this.getFullYear();
  var month = padStartTo2With0(this.getMonth() + 1);
  var day = padStartTo2With0(this.getDate());
  var hours = padStartTo2With0(this.getHours())
  return year + "-" + month + "-" + day + '  ' + hours + ':00';
}
Date.prototype.getBJHourMi = function () {
  var hours = padStartTo2With0(this.getHours())
  var minutes = padStartTo2With0(this.getMinutes());
  return hours + ':' + minutes;
}

export function dateFilter(value) {
  if (value && !isNaN(value)) {
    return (new Date(value * 1)).getBJDate()
  } else {
    return '---'
  }
}

export function timeFilter00(value) {
  if (value && !isNaN(value)) {
    return (new Date(value * 1)).getBJTime00()
  } else {
    return '---'
  }
}

export function timeFilter(value) {
  if (value && !isNaN(value)) {
    return (new Date(value * 1)).getBJTime()
  } else {
    return '---'
  }
}
