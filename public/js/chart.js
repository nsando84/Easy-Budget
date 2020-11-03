
const makeChart = (transaction) => {


    const chartDiv = document.getElementById('chart')
    const chartId = document.getElementById('myChart')


    chartId.remove()
    chartId.innerHTML = `<canvas id="myChart" height="200" width="500"></canvas>`
    chartDiv.append(chartId)

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: transaction[0],
            datasets: [{
                label: false,
                data: transaction[1],
                fill: false,
                borderColor: 'rgb(96, 35, 139)'
            }]
        },
        options: {        
            legend: {
              display: false
            },
          }
    });

}