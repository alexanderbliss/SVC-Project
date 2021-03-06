myApp.controller('ReportController', function (UserService, ReportService, $http) {
    var vm = this;
    vm.reportService = ReportService;
    vm.userObject = UserService.userObject
    console.log(vm.userObject);
    
    // vm.year = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030];
    vm.year = [];
    for (var i = 2014; i<=2030;i++){
        vm.year.push(i);
    }
    vm.selectedYear = 0;
    vm.selectedMonth = "";
    vm.month = ['jan', 'feb', 'march', 'april', 'may', 'june', 'july', 'aug', 'sept', 'oct', 'nov', 'dec'];
    vm.Donut = false;
    vm.Bar = false;
    vm.Line = false;
    // COUNT the number of time Advocate was dispatched
    vm.cases = []; 
    // Chart: Global Options
    Chart.defaults.global.defaultFontFamily = 'Lato';
    Chart.defaults.global.defaultFontColor = '#777';
    
    
    vm.countDispatch = function () {
        $http.get('/report/nurse').then(function (response) {
            vm.cases = response.data;
            console.log('vm.cases', vm.cases);
            console.log('success counting dispatch');
        }).catch(function(error) {
            console.log('failure', error);
        });
    }
    
    vm.countDispatch();

    // FUNCTION TO CREATE CHART 
    // function createChart (chartElement, boolDonut, boolBar, boolLine, fontSize, chartType, 
    //                         displayLabel, labelData, data, text, boolStartZero){
    //     vm.Donut = boolDonut;
    //     vm.Bar = boolBar;
    //     vm.Line = boolLine;
    //     Chart.defaults.global.defaultFontSize = fontSize;
    //     vm.chart = new Chart (chartElement, {
    //         type: chartType,
    //         data: {
    //             labels: labelData,
    //             datasets: [{
    //                 label: displayLabel,
    //                 data: data,
    //                 backgroundColor: [
    //                     'rgba(255, 99, 132, 0.6)',
    //                     'rgba(54, 162, 235, 0.6)',
    //                     'rgba(255, 206, 86, 0.6)',
    //                     'rgba(75, 192, 192, 0.6)'
    //                 ],
    //                 borderWidth: 1,
    //                 borderColor: '#777',
    //                 hoverBorderWidth: 3,
    //                 hoverBorderColor: '#000'
    //             }]
    //         },
    //         options: {
    //             scales: {
    //                 yAxes: [{
    //                     ticks: {
    //                         beginAtZero: boolStartZero
    //                     }
    //                 }]
    //             },
    //             title: {
    //                 display: true,
    //                 text: text,
    //                 fontSize: 25
    //             },
    //             legend: {
    //                 display: true,
    //                 position: 'right',
    //                 labels: {
    //                     fontColor: '#000'
    //                 }
    //             },
    //             layout: {
    //                 padding: {
    //                     left: 50,
    //                     right: 0,
    //                     bottom: 0,
    //                     top: 0
    //                 }
    //             },
    //             tooltips: {
    //                 enabled: true
    //             }
    //         }   
    //     });
    //     return vm.chart;
    // }
    vm.nurseChart = [];
    vm.myNurseChart = document.getElementById('myNurseChart').getContext('2d');

    // GET NURSE CHART
    vm.requestNurseChart = function () {
        var nurseReportNames = [];
        var advocateCounts = [];
        //console.log('Donut and Bar status:', vm.Donut, vm.Bar);
        vm.Donut = true;
        vm.Bar = false;
        vm.Line = false;
        Chart.defaults.global.defaultFontSize = 15;
        for (var i = 0; i < vm.cases.length; i++) {
            nurseReportNames.push(vm.cases[i].nurse_form_location_name);
            advocateCounts.push(vm.cases[i].count);
        }
        console.log('nurseReportNames', nurseReportNames);
        console.log('advocateCounts', advocateCounts);
        vm.myNurseChart = new Chart (vm.myNurseChart, {
            type: "doughnut",
            data: {
                labels: nurseReportNames,
                datasets: [{
                    label: "Nurse Chart",
                    data: advocateCounts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderWidth: 1,
                    borderColor: '#777',
                    hoverBorderWidth: 3,
                    hoverBorderColor: '#000'
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "The Number of Advocates Dispatched Per Hospital",
                    fontSize: 25
                },
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        fontColor: '#000'
                    }
                },
                layout: {
                    padding: {
                        left: 50,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                tooltips: {
                    enabled: true
                }
            }  
        });
    }
    
    
    vm.taxiData = [];
    
    // GET COUNT OF TAXIS PER LOCATION
    // vm.countTaxi = function () {
    //     $http.get('/report/taxi').then(function (response) {
    //         vm.taxiData = response.data;
    //         console.log('vm.taxiData', vm.taxiData);
    //         // console.log('vm.taxiData.count', vm.taxiData[0].count);
    //         // console.log('vm.taxiData.location_name', vm.taxiData[0].location_name);
    //     console.log('success counting taxis');    
    //     }).catch (function (error) {
    //         console.log('failure', error);    
    //     });
    // }

    // vm.countTaxi();

    // GET "taxi_cost" PER LOCATION AT THE CURRENT YEAR
    vm.computeTaxiExpense = function () {
        $http.get('/report/taxi').then(function (response) {
            vm.taxiData = response.data;
            console.log('vm.taxiData', vm.taxiData);
            console.log('vm.taxiData.sum', vm.taxiData[1].sum);
            console.log('vm.taxiData.location_name', vm.taxiData[1].nan);  
        }).catch(function(error) {
            console.log('failure', error);
        });
    }

    vm.computeTaxiExpense();


    // REQUEST FUNCTION FOR TAXI CHART 
    var myTaxiChart = document.getElementById('myTaxiChart').getContext('2d');
        //TAXI BAR CHART
        vm.requestTaxiChart = function () {
            vm.Donut = false;
            vm.Bar = true;
            vm.Line = false;

            var locationNames = [];
            // var taxiCounts = [];
            var taxiExpense = [];
            for (var i = 0; i < vm.taxiData.length; i++) {
                locationNames.push(vm.taxiData[i].nan);
                taxiExpense.push((vm.taxiData[i].sum).slice(1));     
            }
            console.log('locationNames', locationNames);
            console.log('taxiExpense', taxiExpense);
            // vm.myTaxiChart = createChart (myTaxiChart,false, true, false, 15,"bar",
            //                             "Hospital Name", locationNames, taxiExpense,
            //                             'Taxi Expenses Spent per Hospital', true);
            
            vm.myTaxiChart = new Chart(myTaxiChart, {
                type: 'bar', // bar,pie, line, horizontalBar
                data: {
                    labels: locationNames ,
                    datasets: [{
                        label: 'Hospital Name',
                        data: taxiExpense,
                        fill: false,
                        lineTension: 0.7,
                        
                        backgroundColor: 'green',
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)'
                            // 'rgba(255, 206, 86, 0.6)',
                            // 'rgba(153, 102, 255, 0.6)',
                            // 'rgba(255, 159, 64, 0.6)',
                            // 'rgba(255, 99, 132, 0.6)',
                            // 'rgba(75, 192, 192, 0.6)'
                        ],
                        borderWidth: 1,
                        borderColor: '#777',
                        hoverBorderWidth: 3,
                        hoverBorderColor: '#000'
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Taxi Amount'
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: 'Hospital'
                            }
                        }]
                    },
                    title: {
                        display: true,
                        text: 'Taxi Expenses Spent Per Hospital',
                        fontSize: 30
                    },
                    legend: {
                        position: 'right',
                        labels: {
                            fontColor: '#000'
                        }
                    },
                    layout: {
                        padding: {
                            left: 50,
                            right: 0,
                            bottom: 0,
                            top: 0
                        }
                    },
                    tooltips: {
                        enabled: true
                    }
                } 
            });
        }
            
// ADVOCATE PER LOCATION MONTHLY - LINE CHART
        var myAdvChart = document.getElementById('myAdvChart').getContext('2d');
        vm.requestMonthlyAdvChart = function () {
            // Chart.defaults.global.defaultFontSize = 11;
            var objectToSend = {
                selectedYear: vm.selectedYear
                            };
            var locmonthly = {};
            $http.post('/report/new/locmonthly', objectToSend).then(function (response) {
                console.log('success sending selected year');
            }).catch(function (error) {
                console.log('failure', error);
                
            })

            $http.get('/report/locmonthly').then(function(response) {
                locmonthly = response.data;
                console.log('locmonthly All', locmonthly); 
                console.log('locmonthly[0]', locmonthly[0]); 
                console.log('monthly[0]["01"]', locmonthly[0]["01"]);
                
                vm.displayAdvChart();             
            }).catch(function(error) {
                console.log('failure', error);              
            })
            // ADVOCATE PER LOCATION BAR CHART
            vm.displayAdvChart = function () {
                vm.Donut = false;
                vm.Bar = false;
                vm.Line = true;
                Chart.defaults.global.defaultFontSize = 11;
                var locationNames = [];
                var numOfAdvocates = [];
                // console.log('Donut and Bar status:', vm.Donut, vm.Bar);
                for (var i = 0; i < locmonthly.length; i++) {
                    locationNames.push(locmonthly[i].location_name);
                    switch (vm.selectedMonth) {
                        case 'jan':
                            numOfAdvocates.push(locmonthly[i]["01"]);
                            break;
                        case 'feb':
                            numOfAdvocates.push(locmonthly[i]["02"]);
                            break;
                        case 'march':
                            numOfAdvocates.push(locmonthly[i]["03"]);
                            break;
                        case 'april':
                            numOfAdvocates.push(locmonthly[i]["04"]);
                            break;
                        case 'may':
                            numOfAdvocates.push(locmonthly[i]["05"]);
                            break;
                        case 'june':
                            numOfAdvocates.push(locmonthly[i]["06"]);
                            break;
                        case 'july':
                            numOfAdvocates.push(locmonthly[i]["07"]);
                            break;
                        case 'aug':
                            numOfAdvocates.push(locmonthly[i]["08"]);
                            break;
                        case 'sept':
                            numOfAdvocates.push(locmonthly[i]["09"]);
                            break;
                        case 'oct':
                            numOfAdvocates.push(locmonthly[i]["10"]);
                            break;
                        case 'nov':
                            numOfAdvocates.push(locmonthly[i]["11"]);
                            break;
                        case 'dec':
                            numOfAdvocates.push(locmonthly[i]["12"]);
                            break;
                    }
                }
                console.log('numOfAdvocates', numOfAdvocates);
                
                // vm.myAdvChart = createChart(vm.myAdvChart, false, false, true, 11, "line", 
                //         "Location Name", locationNames, numOfAdvocates, 
                //         'Number of Advocates sent to Hospitals Monthly',true);
                // console.log('locationNames', locationNames);
                // console.log('numOfAdvocates', numOfAdvocates);
                vm.myAdvChart = new Chart(myAdvChart, {
                    type: 'line', // bar,pie, line, horizontalBar
                    data: {
                        labels: locationNames,
                        datasets: [{
                            label: 'Hospital Name',
                            data: numOfAdvocates,
                            fill: false,
                            lineTension: 0.7,
                            backgroundColor: 'green',
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(54, 162, 235, 0.6)'
                                // 'rgba(255, 206, 86, 0.6)',
                                // 'rgba(153, 102, 255, 0.6)',
                                // 'rgba(255, 159, 64, 0.6)',
                                // 'rgba(255, 99, 132, 0.6)',
                                // 'rgba(75, 192, 192, 0.6)'
                            ],
                            borderWidth: 1,
                            borderColor: '#777',
                            hoverBorderWidth: 3,
                            hoverBorderColor: '#000'
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Number of Advocates'
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Hospital'
                                }
                            }]
                        },
                        title: {
                            display: true,
                            text: 'Number of Advocates sent to Hospitals Monthly',
                            fontSize: 30
                        },
                        legend: {
                            position: 'right',
                            labels: {
                                fontColor: '#000'
                            }
                        },
                        layout: {
                            padding: {
                                left: 50,
                                right: 0,
                                bottom: 0,
                                top: 0
                            }
                        },
                        tooltips: {
                            enabled: true
                        }
                    }
                });
            }
        }
});