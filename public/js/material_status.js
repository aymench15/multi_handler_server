
    // $("#updatesettingsButton").click(function () {
    //   post("settings", {
    //     temperature: $("#tempalert").is(":checked"),
    //     humidity: $("#humidalert").is(":checked"),
    //     moisture: $("#moisturealert").is(":checked"),
    //     email: $("#settingsemailalert").is(":checked"),
    //     sms: $("#settingssmsalert").is(":checked"),
    //   })
    //     .then(
    //       function (resp1) {
    //         post("limits", {
    //           data: [
    //             [
    //               $("#temprature_range").data("ionRangeSlider").result.from,
    //               $("#humidity_range").data("ionRangeSlider").result.from,
    //               $("#moisture_range").data("ionRangeSlider").result.from,
    //               $("#sunlight_range").data("ionRangeSlider").result.from,
    //               $("#waterlevel_range").data("ionRangeSlider").result.from,
    //             ],
    //             [
    //               $("#temprature_range").data("ionRangeSlider").result.to,
    //               $("#humidity_range").data("ionRangeSlider").result.to,
    //               $("#moisture_range").data("ionRangeSlider").result.to,
    //               $("#sunlight_range").data("ionRangeSlider").result.to,
    //               $("#waterlevel_range").data("ionRangeSlider").result.to,
    //             ],
    //           ],
    //         }).then(function (resp2) {
    //           if ((resp1 == "Successful") | (resp2 == "Successful")) {
    //             alert("Settings Updated");
    //           }
    //         });
    //       },
    //       function (err) {
    //         this.console.log(err);
    //       }
    //     )
    //     .catch(function (error) {
    //       this.console.log(error);
    //     });

    //   $("#temprature_range")
    //     .data("ionRangeSlider")
    //     .update({
    //       from: $("#temprature_range").data("ionRangeSlider").result.from,
    //       to: $("#temprature_range").data("ionRangeSlider").result.to,
    //     });

    //   $("#humidity_range")
    //     .data("ionRangeSlider")
    //     .update({
    //       from: $("#humidity_range").data("ionRangeSlider").result.from,
    //       to: $("#humidity_range").data("ionRangeSlider").result.to,
    //     });

    //   $("#moisture_range")
    //     .data("ionRangeSlider")
    //     .update({
    //       from: $("#moisture_range").data("ionRangeSlider").result.from,
    //       to: $("#moisture_range").data("ionRangeSlider").result.to,
    //     });

    //   $("#sunlight_range")
    //     .data("ionRangeSlider")
    //     .update({
    //       from: $("#sunlight_range").data("ionRangeSlider").result.from,
    //       to: $("#sunlight_range").data("ionRangeSlider").result.to,
    //     });

    //   $("#waterlevel_range")
    //     .data("ionRangeSlider")
    //     .update({
    //       from: $("#waterlevel_range").data("ionRangeSlider").result.from,
    //       to: $("#waterlevel_range").data("ionRangeSlider").result.to,
    //     });
    // });

    // display_home = function () {
    //   if (currentstatus.station != "NA") {
    //     if (currentstatus.station == "Operational") {
    //       $("#stationstatus")(
    //         '<span style="color: green;">' + currentstatus.station + "</span>"
    //       );
    //     } else if (currentstatus.station == "Offline") {
    //       $("#stationstatus")(
    //         '<span style="color: red;">' + currentstatus.station + "</span>"
    //       );
    //     } else {
    //       $("#stationstatus")(
    //         '<span style="color: red;">' +
    //           currentstatus.station +
    //           "<br/><h6>Server gave a malformed response</h6></span>"
    //       );
    //     }
    //   } else {
    //     $("#stationstatus")("<span><small>Loading...</small></span>");
    //   }

    //   if (currentstatus.motor != "NA") {
    //     if (currentstatus.motor == "Idle") {
    //       $("#pumpstatus")(
    //         '<span style="color: green;">' + currentstatus.motor + "</span>"
    //       );
    //     } else if (currentstatus.motor == "Active") {
    //       $("#pumpstatus")(
    //         '<span style="color: orange;">' + currentstatus.motor + "</span>"
    //       );
    //     } else {
    //       $("#pumpstatus")(
    //         '<span style="color: red;">' +
    //           currentstatus.motor +
    //           "<br/><h6>Server gave a malformed response</h6></span>"
    //       );
    //     }
    //   } else {
    //     $("#pumpstatus")("<span><small>Loading...</small></span>");
    //   }

    //   if (min[0] != "NA" && max[0] != "NA") {
    //     if (
    //       ($("#temprature_range").data("ionRangeSlider").options.from !=
    //         min[0]) |
    //       ($("#temprature_range").data("ionRangeSlider").options.to != max[0])
    //     ) {
    //       $("#temprature_range").data("ionRangeSlider").update({
    //         type: "double",
    //         min: 0,
    //         max: 60,
    //         from: min[0],
    //         to: max[0],
    //         grid: true,
    //         postfix: "°C",
    //       });
    //     }
    //   }

    //   if (min[1] != "NA" && max[1] != "NA") {
    //     if (
    //       ($("#humidity_range").data("ionRangeSlider").options.from != min[1]) |
    //       ($("#humidity_range").data("ionRangeSlider").options.to != max[1])
    //     ) {
    //       $("#humidity_range").data("ionRangeSlider").update({
    //         type: "double",
    //         min: 0,
    //         max: 100,
    //         from: min[1],
    //         to: max[1],
    //         grid: true,
    //         postfix: "%",
    //       });
    //     }
    //   }

    //   if (min[2] != "NA" && max[2] != "NA") {
    //     if (
    //       ($("#moisture_range").data("ionRangeSlider").options.from != min[2]) |
    //       ($("#moisture_range").data("ionRangeSlider").options.to != max[2])
    //     ) {
    //       $("#moisture_range").data("ionRangeSlider").update({
    //         type: "double",
    //         min: 0,
    //         max: 100,
    //         from: min[2],
    //         to: max[2],
    //         grid: true,
    //         postfix: "%",
    //       });
    //     }
    //   }

    //   if (min[3] != "NA" && max[3] != "NA") {
    //     if (
    //       ($("#sunlight_range").data("ionRangeSlider").options.from != min[3]) |
    //       ($("#sunlight_range").data("ionRangeSlider").options.to != max[3])
    //     ) {
    //       $("#sunlight_range").data("ionRangeSlider").update({
    //         type: "double",
    //         min: 0,
    //         max: 10,
    //         from: min[3],
    //         to: max[3],
    //         grid: true,
    //         postfix: " hours",
    //       });
    //     }
    //   }

    //   if (min[4] != "NA" && max[4] != "NA") {
    //     if (
    //       ($("#waterlevel_range").data("ionRangeSlider").options.from !=
    //         min[4]) |
    //       ($("#waterlevel_range").data("ionRangeSlider").options.to != max[4])
    //     ) {
    //       $("#waterlevel_range").data("ionRangeSlider").update({
    //         type: "double",
    //         min: 0,
    //         max: 100,
    //         from: min[4],
    //         to: max[4],
    //         grid: true,
    //         postfix: "%",
    //       });
    //     }
    //   }

    //   if (currentstatus.settings.temperature != "NA") {
    //     $("#tempalert").prop("checked", currentstatus.settings.temperature);
    //   }

    //   if (currentstatus.settings.humidity != "NA") {
    //     $("#humidalert").prop("checked", currentstatus.settings.humidity);
    //   }

    //   if (currentstatus.settings.moisture != "NA") {
    //     $("#moisturealert").prop("checked", currentstatus.settings.moisture);
    //   }

    //   if (currentstatus.settings.sms != "NA") {
    //     $("#settingssmsalert").prop("checked", currentstatus.settings.sms);
    //   }

    //   if (currentstatus.settings.email != "NA") {
    //     $("#settingsemailalert").prop("checked", currentstatus.settings.email);
    //   }
    // };
    // display_home();

    // getaction = function () {
    //   get("status")
    //     .then(
    //       function (status) {
    //         if (status.timestamp != undefined) {
    //           if (status.timestamp != currentstatus.timestamp) {
    //             currentstatus = status;
    //           }
    //         } else {
    //           currentstatus.station = "Offline";
    //         }
    //       },
    //       function (err) {
    //         this.console.log(err);
    //       }
    //     )
    //     .catch(function (error) {
    //       this.console.log(error);
    //     });

    //   get("limits")
    //     .then(
    //       function (limits) {
    //         if (limits[0] != min) {
    //           min = limits[0];
    //         }
    //         if (limits[1] != max) {
    //           max = limits[1];
    //         }
    //       },
    //       function (err) {
    //         this.console.log(err);
    //       }
    //     )
    //     .catch(function (error) {
    //       this.console.log(error);
    //     })
    //     .then(function () {
    //       display_home();
    //     });
    // };
    // getaction();

    // this.setInterval(function () {
    //   getaction();
    // }, frequency);




