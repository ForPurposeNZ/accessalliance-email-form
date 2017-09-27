var ELECTORATE_DROPDOWN_ID = "#id123-control31500616";
var EMAIL_ELEMENT_ID = "#id123-control31500105";
var HEADER_MARKER_SPLITTER = "###";

function getParameterByName(name, url) {
  console.log("made it to getParameterByName");
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function replaceParameterContent() {
  var insertContent = "\n";

  var kids = getParameterByName("kids", url);
  console.log("kids", kids);
  if (kids)
    insertContent +=
      "People in families with children aged 0-4: " + kids + "\n";

  var old = getParameterByName("old", url);
  console.log("old", old);
  if (old) insertContent += "Over 75yrs: " + old + "\n";

  var live = getParameterByName("live", url);
  console.log("live", live);
  if (live) insertContent += "Supported Living Beneficiaries: " + live + "\n";

  var sick = getParameterByName("sick", url);
  console.log("sick", sick);
  if (sick) insertContent += "Sickness Beneficiaries: " + sick + "\n";

  var total = getParameterByName("total", url);
  console.log("total", total);
  if (total)
    insertContent += "Total people with access sensitivity: " + total + "\n";
}

function replaceLetterContent() {
  var emailBody = $("#id123-control32357387");
  var prevEmailBody = emailBody.val();
  console.log("prevEmailBody", prevEmailBody);

  var updatedEmailBody = prevEmailBody.replace("@@@@", insertContent);
  console.log("updatedEmailBody", updatedEmailBody);
  emailBody.val(updatedEmailBody);
}

function dropdownChanged() {
  Console.log("Changed!");
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("Hello Test!");

  var url = $("input[name=tmp_form_host]").val();
  console.log("url", url);

  $(ELECTORATE_DROPDOWN_ID).on("changed", dropdownChanged);
  //replaceLetterContent();

  // set initial electorate from parameter
  var electorate = getParameterByName("electorate", url);
  console.log("electorate", electorate);
  $(ELECTORATE_DROPDOWN_ID)
    .val(electorate)
    .change();
});
