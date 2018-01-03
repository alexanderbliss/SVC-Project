myApp.controller('DispatchDialogController', function (FormService, $http, $mdDialog) {
    console.log('DispatchDialogController created');
    var vm = this;
    vm.reportService = FormService;
    vm.advocateDispatchArray = FormService.advocateDispatchArray;

    vm.closeForm = function () {
        $mdDialog.hide();
    }

    // UPDATE ADVOCATES TIME
    vm.updateDates = function (array) {
        var today = moment().format('YYYY-MM-DD');
        for (var i = 0; i < array.length; i++){
            array[i].last_contacted_date = today;
            FormService.updateDate(array[i].advocate_id, today);
        }
        vm.closeForm();
    }
})