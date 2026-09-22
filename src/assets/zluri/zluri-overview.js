// Charts for the Zluri overview replica. Demo data only.
(function () {
  'use strict';
  if (typeof Highcharts === 'undefined') return;

  var MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  var BASE = {
    chart: { backgroundColor: 'transparent', spacing: [4, 2, 4, 2], style: { fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif' } },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: { categories: MONTHS, lineColor: '#ebebeb', tickColor: '#ebebeb', labels: { style: { color: '#717171', fontSize: '11px' } } },
    yAxis: { title: { text: null }, gridLineColor: '#f2f2f2', labels: { style: { color: '#717171', fontSize: '11px' } } },
    tooltip: { backgroundColor: '#222222', borderWidth: 0, borderRadius: 6, shadow: false, style: { color: '#fff', fontSize: '12px' } },
    plotOptions: { series: { lineWidth: 2, marker: { enabled: false }, states: { hover: { lineWidthPlus: 0 }, inactive: { opacity: 1 } } } },
  };

  function mini(id, data, color, format) {
    var el = document.getElementById(id);
    if (!el) return;
    Highcharts.chart(el, Highcharts.merge(true, {}, BASE, {
      chart: { type: 'column' },
      yAxis: { labels: { format: format } },
      plotOptions: { column: { borderRadius: 3, borderWidth: 0, color: color } },
      series: [{ data: data }],
    }));
  }

  mini('ov-spend-month', [268, 274, 281, 296, 302, 311, 318, 324, 331, 338, 346, 352], '#2266e2', '${value}k');
  mini('ov-spend-user', [148, 149, 151, 154, 153, 155, 156, 157, 155, 156, 157, 158], '#12b76a', '${value}');
  mini('ov-contract-cost', [712, 712, 745, 745, 768, 768, 802, 802, 840, 840, 878, 878], '#f79009', '${value}k');

  var el = document.getElementById('ov-spend-trend');
  if (el) {
    Highcharts.chart(el, Highcharts.merge(true, {}, BASE, {
      chart: { type: 'areaspline' },
      yAxis: { labels: { format: '${value}k' } },
      legend: { enabled: true, align: 'left', verticalAlign: 'top', itemStyle: { fontSize: '11px', fontWeight: '500', color: '#484848' } },
      plotOptions: { areaspline: { stacking: 'normal', lineWidth: 1, fillOpacity: 0.85, marker: { enabled: false } } },
      series: [
        { name: 'Collaboration', data: [82, 84, 86, 91, 93, 96, 98, 99, 101, 103, 106, 108], color: '#2266e2' },
        { name: 'Engineering', data: [74, 76, 78, 82, 84, 86, 88, 90, 92, 94, 96, 98], color: '#5abaff' },
        { name: 'Sales & CRM', data: [61, 62, 64, 67, 68, 70, 71, 72, 74, 75, 77, 78], color: '#12b76a' },
        { name: 'Security', data: [51, 52, 53, 56, 57, 59, 61, 63, 64, 66, 67, 68] , color: '#f79009' },
      ],
    }));
  }
})();
