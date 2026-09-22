// Charts + demo-mode toggle for the Zluri page inside the ITRG dashboard.
// Design language lifted from CIO Analytics: Exo for labels, Roboto for numbers,
// grey-200 (#dadada) gridlines, section accent colours for the series.
(function () {
  'use strict';

  var MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];

  var DATA = {
    apps: [212, 219, 224, 231, 236, 241, 247, 251, 256, 259, 264, 268],
    users: [1840, 1872, 1905, 1948, 1990, 2031, 2074, 2118, 2162, 2211, 2264, 2310],
    requests: [118, 149, 187, 232, 271, 318, 364, 412, 455, 512, 578, 641],
    // cumulative, so it only ever goes up
    savings: [18, 41, 69, 102, 138, 177, 219, 258, 301, 340, 377, 412],
  };

  var BASE = {
    chart: { backgroundColor: 'transparent', spacing: [8, 4, 8, 4], style: { fontFamily: 'Roboto, ui-sans-serif, system-ui, sans-serif' } },
    title: { text: null },
    credits: { enabled: false },
    legend: { enabled: false },
    xAxis: {
      categories: MONTHS,
      lineColor: '#dadada',
      tickColor: '#dadada',
      labels: { style: { color: '#606060', fontFamily: 'Exo, ui-sans-serif, system-ui, sans-serif', fontSize: '12px' } },
    },
    yAxis: {
      title: { text: null },
      gridLineColor: '#ededed',
      gridLineDashStyle: 'Dash',
      labels: { style: { color: '#606060', fontFamily: 'Exo, ui-sans-serif, system-ui, sans-serif', fontSize: '12px' } },
    },
    tooltip: {
      backgroundColor: '#08233f',
      borderWidth: 0,
      borderRadius: 6,
      shadow: false,
      style: { color: '#ffffff', fontFamily: 'Exo, ui-sans-serif, system-ui, sans-serif', fontSize: '13px' },
    },
    plotOptions: {
      series: {
        lineWidth: 3,
        marker: { enabled: false, symbol: 'circle', radius: 4, states: { hover: { enabled: true, radiusPlus: 2, lineWidth: 2, lineColor: '#ffffff' } } },
        states: { hover: { lineWidthPlus: 0 }, inactive: { opacity: 1 } },
      },
    },
  };

  function merge(extra) {
    return Highcharts.merge(true, {}, BASE, extra);
  }

  var CHARTS = [
    {
      id: 'chart-apps',
      options: {
        series: [{ type: 'spline', name: 'Apps under management', data: DATA.apps, color: '#3178f2' }],
        tooltip: { pointFormat: '<b>{point.y} apps</b> under management' },
      },
    },
    {
      id: 'chart-users',
      options: {
        series: [{ type: 'spline', name: 'Users', data: DATA.users, color: '#16a34a' }],
        yAxis: { labels: { format: '{value:,.0f}' } },
        tooltip: { pointFormat: '<b>{point.y:,.0f} users</b> with SaaS access' },
      },
    },
    {
      id: 'chart-requests',
      options: {
        series: [{ type: 'spline', name: 'Access requests automated', data: DATA.requests, color: '#ff8835' }],
        tooltip: { pointFormat: '<b>{point.y} requests</b> fulfilled without a ticket' },
      },
    },
    {
      id: 'chart-savings',
      options: {
        series: [{
          type: 'areaspline',
          name: 'Cost saved',
          data: DATA.savings,
          color: '#8b5cf6',
          fillColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, 'rgba(139,92,246,0.28)'], [1, 'rgba(139,92,246,0.02)']] },
        }],
        yAxis: { labels: { format: '${value}k' } },
        tooltip: { pointFormat: '<b>${point.y}k</b> saved to date' },
      },
    },
  ];

  var rendered = false;

  function renderCharts() {
    if (rendered || typeof Highcharts === 'undefined') return;
    CHARTS.forEach(function (c) {
      var el = document.getElementById(c.id);
      if (el) Highcharts.chart(el, merge(c.options));
    });
    rendered = true;
  }

  function setMode(mode) {
    document.querySelectorAll('[data-panel]').forEach(function (panel) {
      panel.hidden = panel.dataset.panel !== mode;
    });
    document.querySelectorAll('.proto-toggle button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.mode === mode));
    });
    try {
      localStorage.setItem('itrg-zluri-mode', mode);
    } catch (e) {
      /* private window — the toggle still works, it just won't be remembered */
    }
    if (mode === 'regular') {
      renderCharts();
      // charts sized while hidden come out 0px wide
      if (typeof Highcharts !== 'undefined') Highcharts.charts.forEach(function (c) { if (c) c.reflow(); });
    }
  }

  function init() {
    var toggle = document.querySelector('.proto-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-mode]');
      if (btn) setMode(btn.dataset.mode);
    });
    var saved;
    try {
      saved = localStorage.getItem('itrg-zluri-mode');
    } catch (e) {
      saved = null;
    }
    setMode(saved === 'first-day' ? 'first-day' : 'regular');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
